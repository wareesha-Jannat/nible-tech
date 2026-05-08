export const getCtaContent = (category: string) => {
  switch (category) {
    case "seo":
      return {
        kicker: "Get Found on Google",
        headline: "Start Ranking Higher and Getting Organic Traffic",
        description:
          "We improve your SEO so your business appears in search results, attracts qualified visitors, and grows consistently without paid ads.",
        button: "Improve My Rankings",
      };

    case "web":
      return {
        kicker: "Build Your Online Presence",
        headline: "Get a Fast, Modern Website That Converts Visitors",
        description:
          "We design and develop websites that don’t just look good — they load fast, build trust, and turn visitors into customers.",
        button: "Build My Website",
      };

    case "marketing":
      return {
        kicker: "Grow Your Business Online",
        headline: "Turn Traffic Into Leads and Real Customers",
        description:
          "We help you grow through social media, email campaigns, and paid ads that bring targeted traffic and measurable results.",
        button: "Start Marketing Growth",
      };

    default:
      return {
        kicker: "Let’s Work Together",
        headline: "Let’s Build Something Impactful",
        description:
          "We create digital solutions that help businesses grow, scale, and succeed online.",
        button: "Contact Us",
      };
  }
};
