import { useEffect } from "react";
import { site } from "@/config/site";

const setMeta = (selector: string, attr: "name" | "property", key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

/** Actualiza título, descrição e Open Graph por página. */
export function useSeo(title: string | null, description?: string) {
  useEffect(() => {
    const full = title ? `${title} | ${site.name} ${site.edition}` : `${site.name} ${site.edition} | Gala de Premiação`;
    document.title = full;
    setMeta('meta[property="og:title"]', "property", "og:title", full);
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", full);
    if (description) {
      setMeta('meta[name="description"]', "name", "description", description);
      setMeta('meta[property="og:description"]', "property", "og:description", description);
      setMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
    }
  }, [title, description]);
}
