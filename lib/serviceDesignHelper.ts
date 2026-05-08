import { categoryDesign, Category } from "./serviceDesignConfig";

// better hash function (stable + distributed)
function hashString(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0; // convert to 32bit int
  }
  return Math.abs(hash);
}

export function getPattern(category: Category, slug: string) {
  const patterns = categoryDesign[category]?.patterns || [];

  if (patterns.length === 0) {
    return "/patterns/default.svg";
  }

  const index = hashString(slug) % patterns.length;
  return `/patterns/${patterns[index]}.svg`;
}

export function getImage(category: Category, slug: string) {
  const images = categoryDesign[category]?.images || [];

  if (images.length === 0) {
    return "/images/default.svg";
  }

  const index = hashString(slug) % images.length;
  return `/images/${images[index]}.svg`;
}

export function getDesign(category: Category) {
  return categoryDesign[category];
}
