import { Category } from "./serviceDesignConfig";

type ResultItem = {
  title: string;
  description: string;
};

export const categoryResults: Record<Category, ResultItem[]> = {
  seo: [
    {
      title: "Higher Search Visibility",
      description:
        "Get your business in front of people actively searching for your services and increase qualified traffic.",
    },
    {
      title: "Faster Website Performance",
      description:
        "Improve loading speed and responsiveness for a smoother experience that supports better rankings.",
    },
    {
      title: "Stronger Search Indexing",
      description:
        "Ensure your website is properly understood and ranked by search engines for relevant queries.",
    },
    {
      title: "Consistent Organic Growth",
      description:
        "Turn improved visibility into steady traffic, leads, and long-term business growth.",
    },
  ],

  web: [
    {
      title: "High-Performance Applications",
      description:
        "Build fast, reliable systems designed to handle growth without performance issues.",
    },
    {
      title: "Better User Experience",
      description:
        "Deliver clean, intuitive interfaces that keep users engaged and reduce drop-offs.",
    },
    {
      title: "Scalable Architecture",
      description:
        "Ensure your product is built with a strong foundation that supports future expansion.",
    },
    {
      title: "Higher Conversions",
      description:
        "Turn more visitors into customers through optimized design, flow, and functionality.",
    },
  ],

  marketing: [
    {
      title: "Increased Brand Visibility",
      description:
        "Reach the right audience across social media, search, and paid platforms with targeted campaigns.",
    },
    {
      title: "Stronger Audience Engagement",
      description:
        "Create content and campaigns that attract attention and encourage real interaction.",
    },
    {
      title: "Data-Driven Strategy",
      description:
        "Make smarter marketing decisions using performance insights and real campaign data.",
    },
    {
      title: "Higher Return on Investment",
      description:
        "Focus on strategies that generate measurable growth, leads, and revenue.",
    },
  ],
};
