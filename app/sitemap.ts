import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://nibletech.com",
      lastModified: new Date(),
    },
    {
      url: "https://nibletech.com/about",
      lastModified: new Date(),
    },
    {
      url: "https://nibletech.com/blogs",
      lastModified: new Date(),
    },
    {
      url: "https://nibletech.com/portfolio",
      lastModified: new Date(),
    },
    {
      url: "https://nibletech.com/contact",
      lastModified: new Date(),
    },
  ];
}
