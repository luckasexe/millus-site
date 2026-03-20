import { useEffect } from "react";

type PageMetaOptions = {
  title: string;
  description: string;
};

function ensureMeta(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);

  if (!element) {
    element = document.createElement("meta");
    Object.entries(attributes).forEach(([key, value]) => {
      element?.setAttribute(key, value);
    });
    document.head.appendChild(element);
  }

  return element;
}

export function usePageMeta({ title, description }: PageMetaOptions) {
  useEffect(() => {
    document.title = title;

    const descriptionMeta = ensureMeta('meta[name="description"]', {
      name: "description",
    });
    descriptionMeta.setAttribute("content", description);

    const ogTitle = ensureMeta('meta[property="og:title"]', {
      property: "og:title",
    });
    ogTitle.setAttribute("content", title);

    const ogDescription = ensureMeta('meta[property="og:description"]', {
      property: "og:description",
    });
    ogDescription.setAttribute("content", description);

    const twitterTitle = ensureMeta('meta[name="twitter:title"]', {
      name: "twitter:title",
    });
    twitterTitle.setAttribute("content", title);

    const twitterDescription = ensureMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
    });
    twitterDescription.setAttribute("content", description);
  }, [description, title]);
}
