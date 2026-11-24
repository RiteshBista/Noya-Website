import Seo from "../components/Seo";

function LegalPage({
  title,
  path,
  children,
}: {
  title: string;
  path: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Seo
        title={`${title} · NOYA`}
        description={`${title} for the NOYA website, Gairidhara, Kathmandu.`}
        path={path}
      />
      <section className="relative bg-[var(--color-background)] py-section px-6 md:px-10">
        <div className="mx-auto max-w-column">
          <span className="eyebrow">Legal</span>
          <h1 className="mt-4 font-display text-display-lg tracking-display text-[var(--color-text)]">
            {title}
          </h1>
          <div className="mt-8 flex flex-col gap-4 text-body text-[var(--color-text-secondary)]">
            {children}
          </div>
        </div>
      </section>
    </>
  );
}

export function Privacy() {
  return (
    <LegalPage title="Privacy Policy" path="/privacy">
      <p>
        NOYA collects only the information you choose to share with us directly, through an enquiry, a reservation request, or a phone call, such as your name, email address, phone
        number, and stay details.
      </p>
      <p>
        This information is used solely to respond to your enquiry and, if you stay with us, to
        prepare for your visit. It is not sold, shared with third parties for marketing purposes,
        or used for anything beyond your reservation and correspondence with the house.
      </p>
      <p>
        If you have questions about your data, write to us at{" "}
        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=contact@noya.com.np&su=Privacy%20Question"
          className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors"
        >
          contact@noya.com.np
        </a>
        .
      </p>
    </LegalPage>
  );
}

export function Terms() {
  return (
    <LegalPage title="Terms" path="/terms">
      <p>
        Reservation requests submitted through this website are enquiries, not confirmed bookings.
        A stay is confirmed only once NOYA has replied directly to your enquiry.
      </p>
      <p>
        Check-in is from 11:00 and check-out is by 10:00 PM, unless otherwise arranged in advance.
        Rates, availability, and house policies are confirmed at the time of booking.
      </p>
      <p>
        Content on this website, including text, photography, and design, belongs to NOYA and may not be
        reproduced without permission.
      </p>
    </LegalPage>
  );
}

export function Accessibility() {
  return (
    <LegalPage title="Accessibility" path="/accessibility">
      <p>
        NOYA is a working restoration of a mid-18th-century home, with stone stairs, low
        doorways, and uneven original flooring throughout. It is not step-free.
      </p>
      <p>
        If you have accessibility needs, please write to us before booking and we will tell you
        honestly whether the house is a good fit for your visit.
      </p>
      <p>
        This website is built with semantic markup, visible focus states, and reduced-motion
        support. If you encounter a barrier using it, let us know and we'll address it.
      </p>
    </LegalPage>
  );
}
