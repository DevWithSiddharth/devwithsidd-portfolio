export const SITE_URL = "https://devwithsidd.vercel.app";

export function seo(title: string, description: string, path = "/") {
  const cleanedPath = `/${path.split("/").filter(Boolean).map(encodeURIComponent).join("/")}`;
  const full = `${title} — DevWithSidd`;
  const url = `${SITE_URL}${cleanedPath}`;
  const image = `${SITE_URL}/og-image.svg`;

  return {
    meta: [
      { title: full },
      { name: "description", content: description },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: full },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { property: "og:image", content: image },
      { property: "og:site_name", content: "DevWithSidd" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: full },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: image },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
