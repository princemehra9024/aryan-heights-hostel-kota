import { useEffect } from "react";

interface SEOProps {
  title: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
}

/**
 * Per-page SEO injector.
 * Updates <title>, meta description/keywords, canonical, and OG/Twitter tags
 * without a full-page reload (SPA-friendly).
 */
export const SEO = ({ title, description, keywords, canonical, ogImage }: SEOProps) => {
  useEffect(() => {
    const BRAND = "Aryan Heights Hostel Kota";
    const fullTitle = title.includes(BRAND) ? title : `${title} | ${BRAND}`;

    /* ── Title ── */
    const prevTitle = document.title;
    document.title = fullTitle;

    /* ── Meta helpers ── */
    const setMeta = (selector: string, attr: string, value?: string) => {
      if (!value) return;
      const el = document.querySelector(selector);
      if (el) el.setAttribute(attr, value);
    };

    setMeta('meta[name="description"]',         "content", description);
    setMeta('meta[name="keywords"]',            "content", keywords);
    setMeta('meta[property="og:title"]',        "content", fullTitle);
    setMeta('meta[property="og:description"]',  "content", description);
    setMeta('meta[property="og:image"]',        "content", ogImage ?? "https://aryanheights.in/og-image.jpg");
    setMeta('meta[property="og:url"]',          "content", canonical ?? "https://aryanheights.in/");
    setMeta('meta[name="twitter:title"]',       "content", fullTitle);
    setMeta('meta[name="twitter:description"]', "content", description);
    setMeta('meta[name="twitter:url"]',         "content", canonical ?? "https://aryanheights.in/");

    /* ── Canonical ── */
    if (canonical) {
      const link = document.querySelector('link[rel="canonical"]');
      if (link) link.setAttribute("href", canonical);
    }

    return () => {
      document.title = prevTitle;
    };
  }, [title, description, keywords, canonical, ogImage]);

  return null;
};
