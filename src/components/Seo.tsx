import { useEffect } from "react";

const SITE_NAME = "NOYA";
const SITE_ORIGIN = "https://www.noya.com.np";

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`
  );
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/**
 * Lightweight per-page SEO: document title, meta description, canonical URL,
 * and Open Graph tags. No external dependency — just direct head management,
 * applied on every route change.
 */
export default function Seo({
  title,
  description,
  path,
  image = "/images/hero-exterior-night.jpg",
  structuredData,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  structuredData?: Record<string, unknown>;
}) {
  useEffect(() => {
    const fullTitle = title.includes(SITE_NAME) ? title : `${title} · ${SITE_NAME}`;
    document.title = fullTitle;

    setMeta("name", "description", description);
    setLink("canonical", `${SITE_ORIGIN}${path}`);

    setMeta("property", "og:site_name", SITE_NAME);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", `${SITE_ORIGIN}${path}`);
    setMeta("property", "og:image", `${SITE_ORIGIN}${image}`);
    setMeta("name", "twitter:card", "summary_large_image");

    let ld = document.getElementById("structured-data") as HTMLScriptElement | null;
    if (structuredData) {
      if (!ld) {
        ld = document.createElement("script");
        ld.id = "structured-data";
        ld.type = "application/ld+json";
        document.head.appendChild(ld);
      }
      ld.textContent = JSON.stringify(structuredData);
    } else if (ld) {
      ld.remove();
    }
  }, [title, description, path, image, structuredData]);

  return null;
}
