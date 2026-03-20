import { useEffect } from "react";

export function useStructuredData(id: string, data: Record<string, unknown>) {
  useEffect(() => {
    let script = document.head.querySelector<HTMLScriptElement>(
      `script[data-structured-data="${id}"]`,
    );

    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.structuredData = id;
      document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(data);

    return () => {
      script?.remove();
    };
  }, [data, id]);
}
