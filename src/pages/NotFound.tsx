import Seo from "../components/Seo";
import ArrowLink from "../components/ArrowLink";

export default function NotFound() {
  return (
    <>
      <Seo
        title="Page Not Found · NOYA"
        description="The page you're looking for doesn't exist."
        path="/404"
      />
      <section className="relative bg-[var(--color-background)] min-h-[70svh] flex flex-col items-center justify-center px-6 text-center">
        <span className="eyebrow">404</span>
        <h1 className="mt-4 font-display text-display-lg tracking-display text-[var(--color-text)]">
          This room doesn't exist.
        </h1>
        <p className="mt-4 max-w-md text-body text-[var(--color-text-secondary)]">
          The page you're looking for may have moved, or never existed. Let's get you back to the
          house.
        </p>
        <ArrowLink to="/" className="mt-8">
          Return Home
        </ArrowLink>
      </section>
    </>
  );
}
