export type Category = "seo" | "web" | "marketing";

type HeroVariant = "center" | "split" | "minimal";

type CategoryDesign = {
  patterns: string[];
  images: string[];
  heroVariant: HeroVariant;
  overlay: string;
};

export const categoryDesign: Record<Category, CategoryDesign> = {
  seo: {
    patterns: ["seo-1", "seo-2", "seo-3"],
    images: ["img-1", "img-2"],
    heroVariant: "center",
    overlay: "bg-gradient-to-br from-purple-100/80 via-white to-purple-50",
  },

  web: {
    patterns: ["web-1", "web-2", "web-3"],
    images: ["img-2", "img-3"],
    heroVariant: "split",
    overlay: "bg-gradient-to-br from-indigo-100/80 via-white to-purple-50",
  },

  marketing: {
    patterns: ["digital-1", "digital-2", "digital-3"],
    images: ["img-1", "img-3"],
    heroVariant: "minimal",
    overlay: "bg-gradient-to-br from-purple-100 via-pink-50 to-blue-50",
  },
};
