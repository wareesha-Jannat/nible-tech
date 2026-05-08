import { Category } from "./serviceDesignConfig";

type ProcessStep = {
  title: string;
  description: string;
};

export const categoryProcess: Record<Category, ProcessStep[]> = {
  seo: [
    {
      title: "Technical Audit",
      description:
        "We analyze your website to identify crawl issues, performance gaps, and SEO opportunities that impact visibility.",
    },
    {
      title: "Strategy Planning",
      description:
        "We create a focused SEO strategy tailored to improve rankings, structure, and search visibility.",
    },
    {
      title: "Optimization & Fixes",
      description:
        "We implement on-page, technical, and structural improvements to strengthen your search performance.",
    },
    {
      title: "Monitoring & Growth",
      description:
        "We continuously track rankings and refine SEO efforts for long-term organic growth.",
    },
  ],

  web: [
    {
      title: "Requirement Analysis",
      description:
        "We understand your business goals and define a clear roadmap for building a high-performing website.",
    },
    {
      title: "UI/UX Design",
      description:
        "We design clean, intuitive interfaces focused on usability, engagement, and user experience.",
    },
    {
      title: "Development",
      description:
        "We build fast, scalable, and responsive websites using modern development practices.",
    },
    {
      title: "Launch & Support",
      description:
        "We deploy your website and provide ongoing improvements, updates, and technical support.",
    },
  ],

  marketing: [
    {
      title: "Market Research",
      description:
        "We analyze your audience, competitors, and market trends to shape a strong marketing direction.",
    },
    {
      title: "Campaign Strategy",
      description:
        "We design targeted strategies across social media, email, and ads to maximize reach and conversions.",
    },
    {
      title: "Execution",
      description:
        "We run and manage campaigns focused on generating leads, engagement, and measurable results.",
    },
    {
      title: "Optimization",
      description:
        "We continuously optimize campaigns to improve performance and reduce cost per acquisition.",
    },
  ],
};

