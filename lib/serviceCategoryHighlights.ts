export type Highlight = {
  title: string;
  description: string;
};

export const categoryHighlights: Record<string, Highlight[]> = {
  seo: [
    {
      title: "Why it matters",
      description:
        "If your website isn’t visible on search engines, you’re missing out on high-intent users actively searching for your services.",
    },
    {
      title: "Core focus",
      description:
        "We improve technical structure, content relevance, and search signals so your website becomes easier for Google to rank and trust.",
    },
    {
      title: "Outcome",
      description:
        "Steady organic traffic growth, improved rankings, and long-term visibility without relying on ads.",
    },
  ],

  web: [
    {
      title: "Why it matters",
      description:
        "Your website is the foundation of your online presence and directly affects how users perceive your brand.",
    },
    {
      title: "Core focus",
      description:
        "We focus on performance, usability, and clean design to ensure your website delivers a smooth experience on every device.",
    },
    {
      title: "Outcome",
      description:
        "Higher engagement, better user trust, and improved conversion rates from visitors to customers.",
    },
  ],

  marketing: [
    {
      title: "Why it matters",
      description:
        "Even great products fail without proper visibility — marketing ensures your business reaches the right audience at the right time.",
    },
    {
      title: "Core focus",
      description:
        "We run targeted campaigns across social media, email, and ads to attract, engage, and convert potential customers.",
    },
    {
      title: "Outcome",
      description:
        "Consistent lead generation, stronger brand awareness, and measurable business growth.",
    },
  ],
};

export function getCategoryHighlights(category: string) {
  return categoryHighlights[category] || [];
}
