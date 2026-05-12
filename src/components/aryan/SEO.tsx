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
 * Updates <title>, meta description/keywords, canonical, and OG tags
 * without a full-page reload (SPA-friendly).
 */
export const SEO = ({ title, description, keywords, canonical, ogImage }: SEOProps) => {
  useEffect(() => {
    const BRAND = "Aryan Heights Hostel Kota";

    /* ── Title ── */
    const prevTitle = document.title;
    document.title = `${title} | ${BRAND}`;

    /* ── Meta helpers ── */
    const setMeta = (selector: string, attr: string, value?: string) => {
      if (!value) return;
      const el = document.querySelector(selector);
      if (el) el.setAttribute(attr, value);
    };

    setMeta('meta[name="description"]',         "content", description);
    setMeta('meta[name="keywords"]',            "content", keywords);
    setMeta('meta[property="og:title"]',        "content", `${title} | ${BRAND}`);
    setMeta('meta[property="og:description"]',  "content", description);
    setMeta('meta[property="og:image"]',        "content", ogImage ?? "https://aryanheights.in/og-image.jpg");
    setMeta('meta[name="twitter:title"]',       "content", `${title} | ${BRAND}`);
    setMeta('meta[name="twitter:description"]', "content", description);

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
