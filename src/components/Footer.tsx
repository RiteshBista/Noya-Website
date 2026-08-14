import { contact } from "../data/site";

export default function Footer() {
  return (
    <footer className="relative bg-[var(--color-ink-2)] border-t border-[var(--color-hairline-2)] px-6 md:px-10 py-16">
      <div className="mx-auto max-w-[1280px] grid grid-cols-1 md:grid-cols-4 gap-12">
        <div>
          <span>
              <img src="images/noya-logo.png" alt="Noya Logo" className="h-5 w-auto" />
          </span>
          <p className="mt-4 text-sm leading-relaxed text-[var(--color-paper-faint)] max-w-[220px]">
            A restored 18th-century heritage home in Gairidhara, Kathmandu.
          </p>
        </div>

        <div>
          <span className="eyebrow">Address</span>
          <p className="mt-4 text-sm leading-relaxed text-[var(--color-paper-dim)] max-w-[220px]">
            {contact.address}
          </p>
        </div>

        <div>
          <span className="eyebrow">Reservations</span>
          <p className="mt-4 text-sm text-[var(--color-paper-dim)]">
            <a href={contact.phoneHref} className="hover:text-[var(--color-sage)] transition-colors">
              {contact.phone}
            </a>
          </p>
          <span className="eyebrow mt-6 block">Enquiries</span>
          <p className="mt-4 text-sm text-[var(--color-paper-faint)]">Add email address</p>
        </div>

        <div>
          <span className="eyebrow">Check-in / Check-out</span>
          <p className="mt-4 text-sm text-[var(--color-paper-dim)]">
            {contact.checkIn} &nbsp;/&nbsp; {contact.checkOut}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-[1280px] mt-16 pt-8 border-t border-[var(--color-hairline-2)] flex flex-col md:flex-row justify-between gap-4 text-xs text-[var(--color-paper-faint)]">
        <span>&copy; {new Date().getFullYear()} NOYA. All rights reserved.</span>
        <span>Kathmandu, Nepal</span>
      </div>
    </footer>
  );
}
