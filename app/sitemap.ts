import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://citizenslingerie.com",
      lastModified: new Date(),
    },
    {
      url: "https://citizenslingerie.com/products",
      lastModified: new Date(),
    },
  ];
}
