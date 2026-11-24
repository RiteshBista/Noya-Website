import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PageHero from "../components/PageHero";
import Seo from "../components/Seo";
import SolidCta from "../components/SolidCta";
import ReservationSentDialog from "../components/ReservationSentDialog";
import { contact, pageSeo } from "../data/site";
import { findRoom, rooms, roomPhotos, roomCover } from "../data/rooms";

// Every room on the Rooms page, by the name shown there and in page order,
// read from the same data (data/rooms.ts), so the two never drift apart.
const roomOptions = ["No preference", ...rooms.map((room) => room.name)];

// Reservation requests go out as a pre-filled email from the visitor's own
// mail app (mailto:); nothing is sent until they press Send there.
const RESERVATIONS_EMAIL = "admin@noya.com.np";
const RESERVATION_SUBJECT = "New Reservation Request — NOYA";

// Set (with the form's values) when a valid request hands off to the mail
// app, and removed once the visitor answers the "Have you sent it?" prompt.
// Per tab (sessionStorage), so it survives the tab being reloaded while the
// mail app is open but never shows the prompt on an ordinary visit.
const PENDING_KEY = "noya:reservation-pending";

type ReservationForm = {
  checkIn: string;
  checkOut: string;
  guests: string;
  room: string;
  name: string;
  email: string;
  phone: string;
  message: string;
};

function readPending(): ReservationForm | null {
  try {
    const raw = sessionStorage.getItem(PENDING_KEY);
    return raw ? (JSON.parse(raw) as ReservationForm) : null;
  } catch {
    return null;
  }
}

function clearPending() {
  try {
    sessionStorage.removeItem(PENDING_KEY);
  } catch {
    // Storage unavailable (e.g. blocked): nothing was saved to clear.
  }
}

export default function Reserve() {
  // Room pages link here as /reserve?room=<slug>; that room is preselected.
  const [params] = useSearchParams();
  const roomOfInterest = findRoom(params.get("room") ?? undefined);
  const reservationCover = roomOfInterest?.photos.length
    ? roomPhotos[roomOfInterest.photos[0]]
    : roomCover("juliet-room");

  const emptyForm = (): ReservationForm => ({
    checkIn: "",
    checkOut: "",
    guests: "1",
    room: roomOfInterest?.name ?? roomOptions[0],
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // A request handed to the mail app before this tab was reloaded comes
  // back with its values, and the dialog asks again.
  const [form, setForm] = useState<ReservationForm>(() => readPending() ?? emptyForm());

  // Where the visitor is in the hand-off:
  //   form    — filling in the form (the usual button and note)
  //   ask     — back from the mail app: dialog, "Have you sent your email?"
  //   sent    — they say they've sent it: dialog offers to clear the form
  //   cleared — they cleared it: a quiet note until they type again
  // The website can't know whether the email was actually sent, so no step
  // ever says it was delivered or received, and nothing clears by itself.
  const [step, setStep] = useState<"form" | "ask" | "sent" | "cleared">(() =>
    readPending() ? "ask" : "form"
  );

  // After a valid submit, wait for the visitor to leave for the mail app
  // and come back before asking. No single event covers every way of
  // leaving and returning, so several are listened to:
  //   leave  — visibilitychange→hidden (another tab), blur (another window,
  //            Alt+Tab, a desktop mail app), pagehide (navigated away)
  //   return — visibilitychange→visible, focus, pageshow from the
  //            back/forward cache
  // A full reload (or a page evicted from that cache) remounts instead,
  // and the pending request in sessionStorage brings the dialog back.
  const awaitingReturn = useRef(false);
  const leftForMailApp = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);
  // Only move focus when the visitor closed the dialog, not on load.
  const moveFocus = useRef(false);

  const showPromptIfReturned = useCallback(() => {
    if (awaitingReturn.current && leftForMailApp.current) {
      awaitingReturn.current = false;
      leftForMailApp.current = false;
      setStep("ask");
    }
  }, []);

  useEffect(() => {
    const onLeave = () => {
      if (awaitingReturn.current) leftForMailApp.current = true;
    };
    const onVisibility = () =>
      document.visibilityState === "hidden" ? onLeave() : showPromptIfReturned();
    // Restored from the back/forward cache after the page was left in the
    // same tab (a browser that doesn't open the email in a new tab).
    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted && awaitingReturn.current) {
        leftForMailApp.current = true;
        showPromptIfReturned();
      }
    };
    window.addEventListener("blur", onLeave);
    window.addEventListener("pagehide", onLeave);
    window.addEventListener("focus", showPromptIfReturned);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pageshow", onPageShow);
    return () => {
      window.removeEventListener("blur", onLeave);
      window.removeEventListener("pagehide", onLeave);
      window.removeEventListener("focus", showPromptIfReturned);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pageshow", onPageShow);
    };
  }, [showPromptIfReturned]);

  // When the dialog closes, focus returns to the submit button (the control
  // that started the hand-off), with the "cleared" note right below it.
  // Runs after the dialog's own cleanup has lifted the page's inert state.
  useEffect(() => {
    if (!moveFocus.current || step === "ask" || step === "sent") return;
    moveFocus.current = false;
    formRef.current?.querySelector<HTMLButtonElement>('button[type="submit"]')?.focus();
  }, [step]);

  const closeTo = (next: "form" | "cleared") => {
    moveFocus.current = true;
    setStep(next);
  };

  // Close, Escape, the backdrop, "Not yet" and "Keep my details": nothing
  // is cleared, and the form is back as it was, ready to open the email
  // again whenever they like.
  const keepDetails = useCallback(() => {
    clearPending();
    closeTo("form");
  }, []);

  // Only ever reached by the visitor's explicit "Clear reservation details".
  const clearForm = () => {
    clearPending();
    setForm(emptyForm());
    closeTo("cleared");
  };

  const update =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [field]: e.target.value }));
      // Starting a new request retires the "cleared" note.
      setStep((s) => (s === "cleared" ? "form" : s));
    };

  // Runs only once the browser's own validation has passed (required
  // fields, a valid email, guests 1–8). Every field goes into the body;
  // CRLF line breaks keep it readable across mail apps, and
  // encodeURIComponent encodes spaces, accents, ampersands and line breaks.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // A fresh attempt: the form row stays as it is while the mail app is
    // open, and the dialog waits for the visitor to come back.
    setStep("form");
    awaitingReturn.current = true;
    leftForMailApp.current = false;
    try {
      sessionStorage.setItem(PENDING_KEY, JSON.stringify(form));
    } catch {
      // Storage unavailable: the in-page prompt still works without it.
    }

    const body = [
      "New reservation request from the NOYA website",
      "",
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone || "Not given"}`,
      `Check-in: ${form.checkIn}`,
      `Check-out: ${form.checkOut}`,
      `Guests: ${form.guests}`,
      `Room preference: ${form.room}`,
      "",
      "Message:",
      // The message's own line breaks normalised to CRLF like the rest.
      form.message.replace(/\r?\n/g, "\r\n") || "(none)",
    ].join("\r\n");

    const mailto = `mailto:${RESERVATIONS_EMAIL}?subject=${encodeURIComponent(
      RESERVATION_SUBJECT
    )}&body=${encodeURIComponent(body)}`;

    // Opened as a new-tab link rather than by assigning location.href:
    // where Gmail is the browser's mailto handler, assigning location.href
    // makes Gmail *replace this page* in the same tab, so there's no
    // Reserve tab to come back to, only the Back button. As a new-tab link,
    // Gmail opens beside the page and the visitor returns by switching
    // tabs or windows. A desktop mail app is launched as before (Chrome and
    // Edge close the momentary blank tab themselves).
    const link = document.createElement("a");
    link.href = mailto;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.click();
  };

  return (
    <>
      <Seo {...pageSeo.reserve} />
      <PageHero
        compact
        eyebrow="Reserve"
        title="Request a reservation."
        subtitle="Every enquiry, answered personally by the house."
        image={reservationCover.src}
        imageAlt={reservationCover.alt}
        // "medium", not "light": depending on the crop, the bright lamp/bed
        // area can sit behind the text (measured as low as 3.7:1 on light).
        scrim="medium"
      />

      <section className="relative bg-[var(--color-background)] py-section px-6 md:px-10">
        <div className="mx-auto max-w-page grid grid-cols-1 md:grid-cols-12 gap-14">
          <div className="md:col-span-7">
            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <label className="flex flex-col gap-2">
                  <span className="eyebrow">Check-in</span>
                  <input
                    type="date"
                    required
                    value={form.checkIn}
                    onChange={update("checkIn")}
                    className="bg-transparent border-0 border-b border-[var(--color-border-strong)] px-0 py-2.5 text-base text-[var(--color-text)] focus:border-b-2 focus:border-[var(--color-primary)] outline-none transition-colors"
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="eyebrow">Check-out</span>
                  <input
                    type="date"
                    required
                    value={form.checkOut}
                    onChange={update("checkOut")}
                    className="bg-transparent border-0 border-b border-[var(--color-border-strong)] px-0 py-2.5 text-base text-[var(--color-text)] focus:border-b-2 focus:border-[var(--color-primary)] outline-none transition-colors"
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <label className="flex flex-col gap-2">
                  <span className="eyebrow">Guests</span>
                  <input
                    type="number"
                    min={1}
                    max={8}
                    required
                    value={form.guests}
                    onChange={update("guests")}
                    className="bg-transparent border-0 border-b border-[var(--color-border-strong)] px-0 py-2.5 text-base text-[var(--color-text)] focus:border-b-2 focus:border-[var(--color-primary)] outline-none transition-colors"
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="eyebrow">Room Preference</span>
                  <select
                    value={form.room}
                    onChange={update("room")}
                    className="bg-[var(--color-background)] border-0 border-b border-[var(--color-border-strong)] px-0 py-2.5 text-base text-[var(--color-text)] focus:border-b-2 focus:border-[var(--color-primary)] outline-none transition-colors cursor-pointer"
                  >
                    {roomOptions.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="flex flex-col gap-2">
                <span className="eyebrow">Name</span>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={update("name")}
                  className="bg-transparent border-0 border-b border-[var(--color-border-strong)] px-0 py-2.5 text-base text-[var(--color-text)] focus:border-b-2 focus:border-[var(--color-primary)] outline-none transition-colors"
                />
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <label className="flex flex-col gap-2">
                  <span className="eyebrow">Email</span>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={update("email")}
                    className="bg-transparent border-0 border-b border-[var(--color-border-strong)] px-0 py-2.5 text-base text-[var(--color-text)] focus:border-b-2 focus:border-[var(--color-primary)] outline-none transition-colors"
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="eyebrow">Phone</span>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={update("phone")}
                    className="bg-transparent border-0 border-b border-[var(--color-border-strong)] px-0 py-2.5 text-base text-[var(--color-text)] focus:border-b-2 focus:border-[var(--color-primary)] outline-none transition-colors"
                  />
                </label>
              </div>

              <label className="flex flex-col gap-2">
                <span className="eyebrow">Message</span>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={update("message")}
                  className="bg-transparent border-0 border-b border-[var(--color-border-strong)] px-0 py-2.5 text-base text-[var(--color-text)] focus:border-b-2 focus:border-[var(--color-primary)] outline-none transition-colors resize-none"
                />
              </label>

              <SolidCta type="submit" className="mt-2 self-start">
                Request a Reservation
              </SolidCta>

              {/* Never a "sent" confirmation: opening the mail app sends
                  nothing until the visitor presses Send there. */}
              {step === "cleared" ? (
                <p className="text-caption text-[var(--color-text-secondary)]">
                  Your reservation details have been cleared from this form.
                </p>
              ) : (
                <p className="text-caption text-[var(--color-text-secondary)]">
                  Your email app will open with your reservation details ready to send. No email app? Write to{" "}
                  <a href={`mailto:${RESERVATIONS_EMAIL}`} className="underline underline-offset-2 hover:text-[var(--color-primary)] transition-colors">
                    {RESERVATIONS_EMAIL}
                  </a>
                  .
                </p>
              )}

              {/* Announces only the "cleared" note (not the usual note
                  when the visitor starts typing again). */}
              <p className="sr-only" aria-live="polite">
                {step === "cleared" ? "Your reservation details have been cleared from this form." : ""}
              </p>
            </form>
          </div>

          <div className="md:col-span-5">
            <div className="border border-[var(--color-border)] p-8 md:p-10">
              <span className="eyebrow">Prefer to call or write?</span>
              <p className="mt-4 text-small text-[var(--color-text-secondary)]">
                <a href={contact.phoneHref} className="hover:text-[var(--color-primary)] transition-colors">
                  {contact.phone}
                </a>
              </p>
              <p className="mt-2 text-small text-[var(--color-text-secondary)]">
                <a href={contact.emailHref} className="hover:text-[var(--color-primary)] transition-colors">
                  {contact.email}
                </a>
              </p>
              <span className="eyebrow mt-8 block">Address</span>
              <p className="mt-4 text-small text-[var(--color-text-secondary)]">
                {contact.address}
              </p>
              <span className="eyebrow mt-8 block">Check-in / Check-out</span>
              <p className="mt-4 text-small text-[var(--color-text-secondary)]">
                {contact.checkIn} &nbsp;/&nbsp; {contact.checkOut}
              </p>
            </div>
          </div>
        </div>
      </section>

      <ReservationSentDialog
        step={step === "ask" || step === "sent" ? step : null}
        onConfirmSent={() => setStep("sent")}
        onClear={clearForm}
        onKeep={keepDetails}
      />
    </>
  );
}
