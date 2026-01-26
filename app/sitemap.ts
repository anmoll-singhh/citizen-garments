import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://citizengarments.com",
      lastModified: new Date(),
    },
    {
      url: "https://citizengarments.com/products",
      lastModified: new Date(),
    },
  ];
}
