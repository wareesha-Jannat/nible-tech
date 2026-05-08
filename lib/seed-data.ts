export const user = {
  name: "Admin User",
  password: "$2b$10$u1Qv8n8c8Gk9kVxQzZxvYedq5k9r3h1mYh5bQv0eQ9oX1c9m1aG5W", //admin@123
  email: "nibletechnology@gmail.com",
  role: "SUPER_ADMIN",
};

export const services = [
  {
    title: "Website Design & Development",
    slug: "website-design-development",
    category: "web",

    shortDescription:
      "We design modern, responsive websites that build trust, improve user experience, and convert visitors into real customers.",

    overview:
      "We build fully custom websites tailored to your business goals with a focus on design clarity, speed, and user experience. Each site is structured to guide visitors from landing to action, whether contacting you, making a purchase, or exploring services. We combine modern UI with scalable development to ensure strong performance across all devices and search engines",

    features: [
      {
        title: "Responsive Design System",
        description:
          "Every layout is built to adapt seamlessly across mobile, tablet, and desktop devices ensuring a consistent user experience everywhere.",
      },
      {
        title: "Conversion-Focused UI",
        description:
          "We design interfaces that guide users toward actions like inquiries, purchases, or bookings with strategic visual flow.",
      },
      {
        title: "Performance Optimized Build",
        description:
          "Fast-loading architecture with optimized assets and code structure to ensure smooth browsing and reduced bounce rates.",
      },
      {
        title: "SEO-Ready Structure",
        description:
          "Clean semantic structure and proper metadata setup to help your website rank better on search engines.",
      },
      {
        title: "Scalable Architecture",
        description:
          "Built with future growth in mind so your website can easily expand with new features and pages.",
      },
      {
        title: "Modern UI System",
        description:
          "Clean, minimal and professional design system aligned with modern web standards and brand identity.",
      },
    ],

    technologies: ["Next.js", "React", "Tailwind CSS", "TypeScript", "Vercel"],
    metaTitle: "Modern Website Design & Development Services",
    metaDescription:
      "Custom responsive websites built for speed, user experience, and conversions. We design and develop scalable websites tailored to your business goals.",

    order: 1,
  },
  {
    title: "E-commerce Development",
    slug: "ecommerce-development",
    category: "web",

    shortDescription:
      "We build scalable e-commerce platforms with smooth checkout, product management, and optimized shopping experiences for higher sales.",

    overview:
      "We develop complete e-commerce solutions that allow businesses to sell products online efficiently. From product listings to secure checkout and order management, every part of the system is designed to maximize conversions and simplify store operations. Our focus is on creating scalable online stores that provide a smooth shopping experience for customers while giving business owners full control over their products and sales.",

    features: [
      {
        title: "Product Management System",
        description:
          "Easily add, update, and organize products with flexible inventory control and category management.",
      },
      {
        title: "Smooth Checkout Flow",
        description:
          "Optimized checkout experience that reduces friction and increases completed purchases.",
      },
      {
        title: "Secure Payment Integration",
        description:
          "Integration with trusted payment gateways ensuring safe and reliable transactions.",
      },
      {
        title: "Order Tracking System",
        description:
          "Real-time order tracking and management system for both admin and customers.",
      },
      {
        title: "Cart Optimization",
        description:
          "Smart cart system designed to reduce abandonment and improve conversions.",
      },
      {
        title: "Scalable Store Architecture",
        description:
          "Built to handle growing product catalogs and increasing traffic without performance issues.",
      },
    ],

    technologies: ["Next.js", "Stripe", "MongoDB", "Node.js", "Tailwind CSS"],
    metaTitle: "Scalable E-commerce Website Development Services",
    metaDescription:
      "We build powerful e-commerce stores with smooth checkout, secure payments, and optimized UX to increase sales and improve shopping experience.",
    order: 2,
  },
  {
    title: "WordPress Development",
    slug: "wordpress-development",
    category: "web",

    shortDescription:
      "Custom WordPress websites that are easy to manage, flexible, and designed for professional business presence without technical hassle",

    overview:
      "We create fully customized WordPress websites tailored for businesses that want flexibility and easy content control. Whether it’s a business website, blog, or service-based platform, we ensure the site is easy to manage while maintaining professional design and performance. The goal is to give you full control over your content without relying on developers for every small update.",

    features: [
      {
        title: "Custom Theme Development",
        description:
          "Unique WordPress themes designed specifically for your brand identity and business needs.",
      },
      {
        title: "Easy Content Management",
        description:
          "User-friendly dashboard that allows non-technical users to update content easily.",
      },
      {
        title: "Plugin Integration",
        description:
          "Seamless integration of essential plugins to extend functionality without complexity.",
      },
      {
        title: "SEO Optimized Setup",
        description:
          "Built-in SEO structure to improve visibility on search engines from the start.",
      },
      {
        title: "Performance Optimization",
        description:
          "Optimized loading speed and lightweight structure for better user experience.",
      },
      {
        title: "Secure Architecture",
        description:
          "Security-focused setup with regular updates and best practices to protect your site.",
      },
    ],

    technologies: ["WordPress", "Elementor", "PHP", "MySQL", "WooCommerce"],
    metaTitle: "Custom WordPress Website Development Services",
    metaDescription:
      "We create easy-to-manage WordPress websites with custom design, SEO optimization, and secure architecture tailored for your business needs.",
    order: 3,
  },
  {
    title: "SEO Optimization",
    slug: "seo-optimization",
    category: "seo",

    shortDescription:
      "Improve your Google rankings with SEO strategies that increase visibility, drive organic traffic, and attract quality leads.",

    overview:
      "We optimize your website to improve its ranking on search engines like Google through a combination of on-page, technical, and content-focused SEO strategies. The goal is to increase organic visibility, attract relevant traffic, and convert visitors into potential customers. Every optimization is tailored to your business niche and competition level to ensure long-term growth rather than short-term spikes.",

    features: [
      {
        title: "Keyword Strategy",
        description:
          "We identify high-value keywords that match user intent and help your business rank for relevant searches.",
      },
      {
        title: "On-Page Optimization",
        description:
          "Optimization of titles, meta tags, headings, and content structure for better search engine understanding.",
      },
      {
        title: "Technical SEO Fixes",
        description:
          "Fix crawl issues, indexing problems, and improve site structure for better search engine performance.",
      },
      {
        title: "Content Optimization",
        description:
          "Improve existing content to make it more engaging, relevant, and search engine friendly.",
      },
      {
        title: "Performance Improvements",
        description:
          "Enhance website speed and core web vitals to improve ranking signals and user experience.",
      },
      {
        title: "Ranking Growth Strategy",
        description:
          "Long-term SEO planning focused on sustainable ranking improvements and organic traffic growth.",
      },
    ],

    technologies: [
      "Google Search Console",
      "Ahrefs",
      "SEMrush",
      "Screaming Frog",
      "Google Analytics",
    ],
    metaTitle: "SEO Services to Improve Google Rankings",
    metaDescription:
      "Boost your search rankings with proven SEO strategies including on-page, technical SEO, and keyword optimization to drive organic traffic growth.",

    order: 1,
  },
  {
    title: "SEO Audit & Website Review",
    slug: "seo-audit-website-review",
    category: "seo",

    shortDescription:
      "Full website SEO audit to identify technical issues, content gaps, and provide a clear roadmap for improving search performance",

    overview:
      "We perform a complete SEO audit of your website to uncover issues that may be affecting your search engine rankings. This includes technical analysis, content evaluation, backlink review, and performance assessment. After the audit, you receive a clear, actionable report that highlights exactly what needs to be improved to boost visibility and search performance.",

    features: [
      {
        title: "Technical Website Audit",
        description:
          "Deep analysis of website structure, indexing, crawlability, and technical SEO health.",
      },
      {
        title: "Content Evaluation",
        description:
          "Review of existing content to identify gaps, duplication, and optimization opportunities.",
      },
      {
        title: "Performance Analysis",
        description:
          "Evaluation of page speed, mobile usability, and core web vitals affecting SEO ranking.",
      },
      {
        title: "Backlink Overview",
        description:
          "Assessment of backlink profile quality and identification of harmful or missing links.",
      },
      {
        title: "SEO Issue Report",
        description:
          "Clear breakdown of all SEO issues affecting your website performance.",
      },
      {
        title: "Actionable Roadmap",
        description:
          "Step-by-step improvement plan to fix issues and improve rankings effectively.",
      },
    ],

    technologies: [
      "Screaming Frog",
      "Ahrefs",
      "Google Analytics",
      "Google Search Console",
    ],
    metaTitle: "Professional SEO Audit & Website Analysis",
    metaDescription:
      "Get a complete SEO audit identifying technical issues, content gaps, and performance problems with a clear roadmap to improve rankings.",
    order: 2,
  },
  {
    title: "Local SEO (Google Business Optimization)",
    slug: "google-business-optimization",
    category: "seo",

    shortDescription:
      "Optimize your Google Business Profile to improve local visibility, attract nearby customers, and increase calls and visits",

    overview:
      "We optimize and manage your Google Business Profile to improve visibility in local search results and Google Maps. This helps businesses appear when potential customers search for services nearby. The focus is on improving profile completeness, keyword relevance, reviews strategy, and local ranking signals to increase calls, visits, and inquiries.",

    features: [
      {
        title: "Profile Optimization",
        description:
          "Complete setup and optimization of your Google Business Profile for maximum visibility.",
      },
      {
        title: "Local Ranking Improvement",
        description:
          "Improve your position in Google Maps and local search results for relevant queries.",
      },
      {
        title: "Review Strategy",
        description:
          "Guidance on collecting and managing customer reviews to build trust and credibility.",
      },
      {
        title: "Keyword Targeting",
        description:
          "Optimize profile content with location-based keywords for better discovery.",
      },
      {
        title: "Category Optimization",
        description:
          "Selection and optimization of business categories to improve search relevance.",
      },
      {
        title: "Visibility Growth",
        description:
          "Increase calls, direction requests, and website visits from local customers.",
      },
    ],

    technologies: [
      "Google Business Profile",
      "Google Maps",
      "Google Analytics",
    ],
    metaTitle: "Google Business Profile Optimization Services",
    metaDescription:
      "Improve local visibility with Google Business optimization, helping your business appear in local search and attract nearby customers.",
    order: 3,
  },
  {
    title: "Social Media Marketing",
    slug: "social-media-marketing",
    category: "marketing",

    shortDescription:
      "Grow your brand on social media with strategic content, audience targeting, and engagement-focused marketing campaigns.",

    overview:
      "We manage and grow your social media presence by creating content strategies, running engagement campaigns, and building a consistent brand identity across platforms like Facebook, Instagram, and others. The goal is to increase visibility, build audience trust, and turn followers into customers through consistent and meaningful engagement.",

    features: [
      {
        title: "Content Strategy",
        description:
          "Planned content direction tailored to your brand and target audience for better engagement.",
      },
      {
        title: "Audience Growth",
        description:
          "Organic strategies to increase followers and reach the right audience for your business.",
      },
      {
        title: "Engagement Boost",
        description:
          "Improve likes, comments, and shares through interactive and relevant content.",
      },
      {
        title: "Brand Consistency",
        description:
          "Maintain a strong and recognizable brand identity across all social platforms.",
      },
      {
        title: "Performance Tracking",
        description:
          "Monitor growth and engagement metrics to improve content strategy over time.",
      },
      {
        title: "Platform Management",
        description:
          "Complete handling of posts, scheduling, and optimization across social channels.",
      },
    ],

    technologies: ["Meta Business Suite", "Instagram", "Facebook", "Canva"],
    metaTitle: "Social Media Marketing & Growth Services",
    metaDescription:
      "Grow your brand with strategic social media marketing, content planning, and engagement-focused campaigns across major platforms.",
    order: 1,
  },
  {
    title: "Email Marketing",
    slug: "email-marketing",
    category: "marketing",

    shortDescription:
      "Automated email campaigns designed to nurture leads, boost engagement, and increase repeat customer conversions",

    overview:
      "We design and manage email marketing campaigns that help businesses build direct communication with their audience. From newsletters to automated sequences, we focus on increasing engagement, nurturing leads, and driving repeat conversions through personalized email strategies.",

    features: [
      {
        title: "Email Campaign Design",
        description:
          "Professionally designed email templates tailored to your brand identity.",
      },
      {
        title: "Automation Setup",
        description:
          "Automated email flows for welcome, follow-up, and promotional campaigns.",
      },
      {
        title: "Audience Segmentation",
        description:
          "Targeted email lists to send relevant content to the right users.",
      },
      {
        title: "Conversion Focus",
        description:
          "Emails designed to drive clicks, engagement, and sales conversions.",
      },
      {
        title: "Performance Tracking",
        description:
          "Monitor open rates, click rates, and engagement for optimization.",
      },
      {
        title: "Retention Strategy",
        description:
          "Keep customers engaged and encourage repeat purchases through email.",
      },
    ],

    technologies: ["Mailchimp", "Brevo", "SendGrid", "ConvertKit"],
    metaTitle: "Email Marketing Automation & Campaign Services",
    metaDescription:
      "Increase engagement and conversions with automated email campaigns, targeted messaging, and performance-driven email marketing strategies.",

    order: 2,
  },
  {
    title: "Paid Advertising (Google & Social Ads)",
    slug: "paid-advertising-google-social-ads",
    category: "marketing",

    shortDescription:
      "Targeted ad campaigns on Google and social platforms to drive instant traffic, leads, and measurable business growth",

    overview:
      "We create and manage paid advertising campaigns across Google and social media platforms to help businesses reach their target audience quickly. From strategy to execution, we focus on maximizing ROI through precise targeting, optimized creatives, and continuous performance tracking.",

    features: [
      {
        title: "Campaign Setup",
        description:
          "Full setup of ad campaigns across Google, Facebook, and Instagram platforms.",
      },
      {
        title: "Audience Targeting",
        description:
          "Reach highly relevant users based on interests, behavior, and demographics.",
      },
      {
        title: "Ad Optimization",
        description:
          "Continuous optimization of ads for better performance and lower cost per result.",
      },
      {
        title: "Conversion Tracking",
        description:
          "Track user actions like clicks, leads, and purchases for performance analysis.",
      },
      {
        title: "Budget Management",
        description:
          "Efficient ad spend management to maximize return on investment.",
      },
      {
        title: "Performance Reporting",
        description:
          "Clear reports showing campaign results, insights, and improvements.",
      },
    ],

    technologies: [
      "Google Ads",
      "Meta Ads",
      "Facebook Pixel",
      "Google Analytics",
    ],
    metaTitle: "Google & Social Media Advertising Services",
    metaDescription:
      "Drive instant traffic and leads with targeted Google and social media ads optimized for ROI, conversions, and business growth.",
    order: 3,
  },
];

export const projects = [
  // ---------------- WEB (2)
  {
    title: "Business Website for Consulting Agency",
    description:
      "A modern, conversion-focused website for a consulting agency, designed to build trust and clearly present services while turning visitors into leads.",
    technologies: ["Next.js", "Tailwind CSS", "Node.js", "MongoDB", "Vercel"],
    features: [
      "Modern and responsive UI design",
      "Clear and structured service sections",
      "Fast performance and optimized loading",
      "Integrated contact form for lead capture",
    ],
    demoUrl: "https://demo-consulting-site.com",
    priority: 1,
  },
  {
    title: "E-commerce Store for Fashion Brand",
    description:
      "A scalable e-commerce platform for a fashion brand, focused on smooth shopping experience and optimized product presentation across devices.",
    technologies: [
      "Next.js",
      "Stripe",
      "MongoDB",
      "Cloudinary",
      "Tailwind CSS",
    ],
    features: [
      "Dynamic product listing and filtering",
      "Secure checkout with Stripe",
      "Shopping cart and order management",
      "Mobile-first responsive design",
    ],
    priority: 2,
  },

  // ---------------- SEO (2)
  {
    title: "SEO Optimization for Local Service Business",
    description:
      "Improved search visibility for a local business by fixing technical SEO issues and optimizing content to drive more organic traffic.",
    technologies: [
      "Google Search Console",
      "Google Analytics",
      "Ahrefs",
      "Screaming Frog",
    ],
    features: [
      "Improved rankings for target keywords",
      "Increase in organic traffic",
      "Better indexing and crawlability",
      "Optimized meta tags and structure",
    ],
    priority: 3,
  },
  {
    title: "Technical SEO Fixes for Content Website",
    description:
      "Resolved key technical SEO issues to improve crawl efficiency, indexing, and overall search engine performance.",
    technologies: [
      "Google Search Console",
      "Lighthouse",
      "Schema Markup",
      "SEO Tools",
    ],
    features: [
      "Fixed indexing issues across pages",
      "Improved Core Web Vitals",
      "Enhanced structured data setup",
      "Better internal linking structure",
    ],
    priority: 4,
  },

  // ---------------- MARKETING (2)
  {
    title: "Social Media Growth Campaign for Startup",
    description:
      "Executed a targeted social media campaign to boost brand awareness and engagement through strategic content and audience targeting.",
    technologies: [
      "Meta Ads",
      "Instagram",
      "Facebook",
      "Canva",
      "Analytics Tools",
    ],
    features: [
      "Increased audience reach",
      "Higher engagement rates",
      "Improved brand visibility",
      "Growth in followers",
    ],
    priority: 5,
  },
  {
    title: "Email Marketing Campaign for Lead Conversion",
    description:
      "Created an email marketing strategy to nurture leads and improve conversions through targeted campaigns and automation.",
    technologies: [
      "Mailchimp",
      "SendGrid",
      "CRM Integration",
      "Analytics Tools",
    ],
    features: [
      "Improved open and click rates",
      "Automated email workflows",
      "Better audience segmentation",
      "Increased conversion rates",
    ],
    priority: 6,
  },
];
export const faqs = [
  {
    question: "How long does it take to complete a project?",
    answer:
      "The timeline depends on the scope and complexity of the project. A standard website usually takes 2–4 weeks, while more advanced projects or ongoing services like SEO and marketing may take longer. We always provide a clear timeline before starting.",
    priority: 1,
  },
  {
    question: "Do you offer ongoing support after project completion?",
    answer:
      "Yes, we provide ongoing support and maintenance after delivery. Whether it's updates, performance improvements, or scaling your project, we can continue working with you based on your needs.",
    priority: 2,
  },
  {
    question: "Will my website be optimized for SEO?",
    answer:
      "Absolutely. Every website we build follows SEO best practices including proper structure, fast performance, and optimized content setup to help you rank better in search engines.",
    priority: 3,
  },
  {
    question: "How soon can I see results from SEO or marketing?",
    answer:
      "SEO is a long-term strategy and typically shows noticeable results within 2–4 months depending on competition. Marketing campaigns can generate faster results, especially paid ads, but performance improves over time with optimization.",
    priority: 4,
  },
  {
    question: "Do you work with small businesses or startups?",
    answer:
      "Yes, we work with startups, small businesses, and growing brands. Our approach is flexible and focused on delivering solutions that match your current stage and help you scale.",
    priority: 5,
  },
  {
    question: "Can I request changes during the project?",
    answer:
      "Yes, we encourage collaboration. You can request changes during the project, and we make sure your feedback is incorporated while keeping the timeline and scope aligned.",
    priority: 6,
  },
  {
    question: "How do we get started?",
    answer:
      "Getting started is simple. Reach out through our contact form, share your requirements, and we’ll schedule a discussion to understand your goals and propose the best approach.",
    priority: 7,
  },
];

export const queries = [
  // ---------------- WEB (3)
  {
    name: "Ali Khan",
    email: "ali.khan@example.com",
    phone: "+923001112233",
    projectType: "Website Design & Development",
    budget: "$1000 - $3000",
    timeline: "2-4 weeks",
    message:
      "I need a modern website for my business with a clean design and fast performance. It should clearly present my services and include a contact form.",
    status: "new",
    createdAt: new Date("2026-05-03"),
  },
  {
    name: "Sara Ahmed",
    email: "sara.ahmed@example.com",
    phone: "+923112223344",
    projectType: "E-commerce Development",
    budget: "$3000 - $6000",
    timeline: "1-2 months",
    message:
      "I want to launch an online store for my clothing brand with product pages, payment integration, and a smooth checkout experience.",
    status: "in-progress",
    createdAt: new Date("2026-04-28"),
  },
  {
    name: "Usman Raza",
    email: "usman.raza@example.com",
    phone: "+923223334455",
    projectType: "WordPress Development",
    budget: "$800 - $2000",
    timeline: "2-3 weeks",
    message:
      "Looking for a WordPress website for my blog with a custom design and easy content management system.",
    status: "completed",
    createdAt: new Date("2026-04-23"),
  },

  // ---------------- SEO (3)
  {
    name: "Hassan Ali",
    email: "hassan.ali@example.com",
    phone: "+923334445566",
    projectType: "SEO Optimization",
    budget: "$500 - $1500",
    timeline: "Ongoing",
    message:
      "My website is not ranking well on Google. I need help with SEO optimization to improve visibility and bring more organic traffic.",
    status: "new",
    createdAt: new Date("2026-04-18"),
  },
  {
    name: "Ayesha Malik",
    email: "ayesha.malik@example.com",
    phone: "+923445556677",
    projectType: "SEO Audit & Website Review",
    budget: "$300 - $800",
    timeline: "1-2 weeks",
    message:
      "I would like a complete SEO audit of my website to understand what is wrong and how I can improve rankings.",
    status: "in-progress",
    createdAt: new Date("2026-04-13"),
  },
  {
    name: "Bilal Hussain",
    email: "bilal.hussain@example.com",
    phone: "+923556667788",
    projectType: "Local SEO (Google Business Optimization)",
    budget: "$400 - $1200",
    timeline: "3-4 weeks",
    message:
      "I run a local business and want to improve my presence on Google Maps and local search results.",
    status: "completed",
    createdAt: new Date("2026-04-08"),
  },

  // ---------------- MARKETING (3)
  {
    name: "Fatima Noor",
    email: "fatima.noor@example.com",
    phone: "+923667778899",
    projectType: "Social Media Marketing",
    budget: "$500 - $2000",
    timeline: "Ongoing",
    message:
      "I need help managing my social media accounts and running campaigns to increase engagement and followers.",
    status: "new",
    createdAt: new Date("2026-04-03"),
  },
  {
    name: "Omar Sheikh",
    email: "omar.sheikh@example.com",
    phone: "+923778889900",
    projectType: "Email Marketing",
    budget: "$300 - $1000",
    timeline: "2-4 weeks",
    message:
      "Looking to set up email campaigns for my business to nurture leads and improve conversions.",
    status: "in-progress",
    createdAt: new Date("2026-03-29"),
  },
  {
    name: "Zain Abbas",
    email: "zain.abbas@example.com",
    phone: "+923889990011",
    projectType: "Paid Advertising (Google & Social Ads)",
    budget: "$1000 - $5000",
    timeline: "Ongoing",
    message:
      "I want to run paid ads on Google and social media to generate leads and increase sales.",
    status: "completed",
    createdAt: new Date("2026-03-24"),
  },
];
export const testimonials = [
  // ---------------- WEB (3)
  {
    name: "Ahmed Raza",
    role: "Business Owner",
    company: "AR Consulting",
    message:
      "The website they built for us completely transformed how we present our business online. It’s fast, modern, and our clients finally understand our services clearly. We’ve already started getting more inquiries.",
  },
  {
    name: "Hina Tariq",
    role: "Founder",
    company: "StyleCart",
    message:
      "Our e-commerce store looks amazing and works smoothly across all devices. The checkout process is simple and we’ve seen a noticeable improvement in conversions since launch.",
  },
  {
    name: "Usman Khalid",
    role: "Blogger",
    company: "",
    message:
      "They delivered exactly what I needed for my WordPress site. Clean design, easy to manage, and everything runs without issues. It made publishing content so much easier for me.",
  },

  // ---------------- SEO (3)
  {
    name: "Bilal Ahmed",
    role: "Local Business Owner",
    company: "BA Services",
    message:
      "Before working with them, my website barely showed up on Google. Within a few months, I started seeing real improvements in rankings and traffic. It’s been a big boost for my business.",
  },
  {
    name: "Ayesha Khan",
    role: "Marketing Manager",
    company: "GrowthHub",
    message:
      "The SEO audit gave us clear direction on what was holding our site back. They fixed technical issues and improved our structure, and we’ve seen steady growth since then.",
  },
  {
    name: "Imran Ali",
    role: "Shop Owner",
    company: "",
    message:
      "Our local visibility improved significantly after their work. We started appearing in Google Maps and getting more calls from nearby customers. Exactly what we needed.",
  },

  // ---------------- MARKETING (3)
  {
    name: "Fatima Zahra",
    role: "Startup Founder",
    company: "Bloom Studio",
    message:
      "Our social media presence has grown a lot since we started working with them. Engagement is higher and our brand finally feels active and visible online.",
  },
  {
    name: "Omar Farooq",
    role: "Sales Manager",
    company: "NextGen Solutions",
    message:
      "The email campaigns helped us reconnect with our audience and improve conversions. The strategy was simple but very effective for our business.",
  },
  {
    name: "Zain Malik",
    role: "Entrepreneur",
    company: "",
    message:
      "We started running ads with their help and saw results almost immediately. Leads increased and the campaigns kept improving over time. Definitely worth it.",
  },
];

export const initialStats = [
  {
    value: 24,
    suffix: "+",
    label: "Projects Delivered",
  },
  {
    value: 18,
    suffix: "+",
    label: "Satisfied Clients",
  },
  {
    value: 2,
    suffix: "+",
    label: "Years of Experience",
  },
];

export const blogs = [
  {
    title: "Why Every Business Needs a Modern Website in 2026",
    slug: "modern-website-importance-2026",
    excerpt:
      "A modern website is no longer optional. It directly impacts trust, user experience, and conversions in today's digital world.",
    content: `
      <h2>Introduction</h2>
      <p>In today's digital-first world, your website is often the first impression customers have of your business. A poorly designed or outdated website can immediately reduce trust and drive potential customers away.</p>

      <h2>First Impressions Matter</h2>
      <p>Users judge your brand within seconds. A clean, fast, and modern interface signals professionalism and reliability.</p>

      <ul>
        <li>Modern design builds instant trust</li>
        <li>Fast loading improves user retention</li>
        <li>Mobile responsiveness is essential</li>
      </ul>

      <h2>User Experience Drives Conversions</h2>
      <p>A well-structured website guides users smoothly toward taking action. Whether it's filling a form or making a purchase, UX plays a huge role.</p>

      <p>Navigation, layout, and content clarity all contribute to conversion rates.</p>

      <h2>SEO and Visibility</h2>
      <p>Modern websites are optimized for search engines. Clean code, fast performance, and proper structure improve your chances of ranking higher.</p>

      <h2>Conclusion</h2>
      <p>A modern website is not just a design upgrade—it is a business investment that directly impacts growth, credibility, and revenue.</p>
    `,
    createdAt: new Date("2026-01-10"),
  },

  {
    title: "How to Build a High-Converting Landing Page",
    slug: "high-converting-landing-page",
    excerpt:
      "Learn the essential elements that make a landing page effective and how to turn visitors into customers.",
    content: `
      <h2>What is a Landing Page?</h2>
      <p>A landing page is a focused page designed to convert visitors into leads or customers. Unlike a full website, it has one clear goal.</p>

      <h2>Key Elements of a High-Converting Page</h2>
      <ul>
        <li>Clear and compelling headline</li>
        <li>Strong call-to-action</li>
        <li>Trust indicators like testimonials</li>
        <li>Minimal distractions</li>
      </ul>

      <h2>Design Simplicity</h2>
      <p>Simplicity is powerful. Avoid clutter and guide the user toward one action.</p>

      <h2>Content Strategy</h2>
      <p>Use persuasive copy that speaks directly to the user’s problem and offers a clear solution.</p>

      <h2>Testing and Optimization</h2>
      <p>Always test variations of your landing page. Small changes can significantly improve conversion rates.</p>

      <h2>Conclusion</h2>
      <p>A great landing page is simple, focused, and optimized for user action.</p>
    `,
    createdAt: new Date("2026-01-18"),
  },

  {
    title: "SEO Basics: How to Rank Your Website Faster",
    slug: "seo-basics-ranking-guide",
    excerpt:
      "A simple guide to understanding SEO fundamentals and improving your website’s visibility in search engines.",
    content: `
      <h2>Understanding SEO</h2>
      <p>Search Engine Optimization (SEO) helps your website appear in search results when users look for relevant keywords.</p>

      <h2>Keyword Research</h2>
      <p>Finding the right keywords is the foundation of SEO. Focus on user intent and search volume.</p>

      <h2>On-Page Optimization</h2>
      <ul>
        <li>Optimize headings and titles</li>
        <li>Write clear meta descriptions</li>
        <li>Use proper URL structure</li>
      </ul>

      <h2>Technical SEO</h2>
      <p>Ensure your site loads fast, is mobile-friendly, and has clean code.</p>

      <h2>Content is King</h2>
      <p>High-quality, useful content improves rankings and keeps users engaged.</p>

      <h2>Conclusion</h2>
      <p>SEO is not instant, but consistent effort leads to long-term organic growth.</p>
    `,
    createdAt: new Date("2026-02-02"),
  },

  {
    title: "Next.js vs React: Which One Should You Choose?",
    slug: "nextjs-vs-react",
    excerpt:
      "Understand the difference between Next.js and React and choose the right tool for your next project.",
    content: `
      <h2>React Overview</h2>
      <p>React is a JavaScript library used for building user interfaces. It gives you flexibility but requires additional setup.</p>

      <h2>Next.js Overview</h2>
      <p>Next.js is a framework built on React that adds routing, server-side rendering, and backend capabilities.</p>

      <h2>Performance Comparison</h2>
      <p>Next.js offers better performance out of the box due to SSR and optimization features.</p>

      <h2>When to Use React</h2>
      <ul>
        <li>Small applications</li>
        <li>Simple UI projects</li>
      </ul>

      <h2>When to Use Next.js</h2>
      <ul>
        <li>SEO-focused applications</li>
        <li>Full-stack web apps</li>
      </ul>

      <h2>Conclusion</h2>
      <p>For most modern applications, Next.js is the better choice.</p>
    `,
    createdAt: new Date("2026-02-15"),
  },

  {
    title: "How UI/UX Design Impacts Business Growth",
    slug: "ui-ux-impact-on-business",
    excerpt:
      "UI/UX design plays a critical role in user engagement and overall business success.",
    content: `
      <h2>What is UI/UX?</h2>
      <p>UI refers to the interface design, while UX focuses on user experience.</p>

      <h2>Why It Matters</h2>
      <p>Good design makes products easier and more enjoyable to use.</p>

      <h2>Business Benefits</h2>
      <ul>
        <li>Higher engagement</li>
        <li>Better retention</li>
        <li>Improved conversions</li>
      </ul>

      <h2>User-Centered Design</h2>
      <p>Design decisions should always be based on user needs and behavior.</p>

      <h2>Consistency and Branding</h2>
      <p>Consistent design strengthens brand identity and trust.</p>

      <h2>Conclusion</h2>
      <p>UI/UX is not just design—it is a strategic business tool.</p>
    `,
    createdAt: new Date("2026-03-01"),
  },

  {
    title: "Top 5 Mistakes Developers Make in Web Projects",
    slug: "developer-common-mistakes",
    excerpt:
      "Avoid common development mistakes that can hurt performance, scalability, and user experience.",
    content: `
      <h2>Introduction</h2>
      <p>Even experienced developers make mistakes that affect project quality.</p>

      <h2>Common Mistakes</h2>
      <ul>
        <li>Poor folder structure</li>
        <li>No performance optimization</li>
        <li>Ignoring SEO basics</li>
        <li>Overcomplicated code</li>
        <li>Bad UI decisions</li>
      </ul>

      <h2>Why These Matter</h2>
      <p>These mistakes can lead to slow performance, poor user experience, and scalability issues.</p>

      <h2>Best Practices</h2>
      <p>Follow clean architecture, optimize performance, and always focus on the end user.</p>

      <h2>Conclusion</h2>
      <p>Avoiding these mistakes will significantly improve your projects.</p>
    `,
    createdAt: new Date("2026-03-12"),
  },
];
