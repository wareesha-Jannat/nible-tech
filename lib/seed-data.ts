export const user = {
  name: "Admin User",
  password: "admin123",
  email: "nibletechnology@gmail.com",
  role: "SUPER_ADMIN",
};

export const services = [
  {
    title: "Web Development",
    description:
      "We build modern, responsive, and scalable web applications tailored to your business needs.",
    category: "development",
    features: ["Responsive Design", "SEO Optimization", "High Performance"],
    technologies: ["React", "Next.js", "Node.js", "Tailwind CSS"],
    featured: true,
    priority: 1,
  },
  {
    title: "App Development",
    description:
      "Create high-performance mobile applications for iOS and Android.",
    category: "mobile",
    features: [
      "Cross-platform Development",
      "Native Performance",
      "Push Notifications",
    ],
    technologies: ["React Native", "Flutter", "Swift", "Kotlin"],
    featured: true,
    priority: 2,
  },
  {
    title: "AI Integration",
    description:
      "Integrate AI into workflows to automate tasks and improve decisions.",
    category: "ai",
    features: [
      "Machine Learning Models",
      "Data Analysis",
      "Smart Recommendations",
    ],
    technologies: ["Python", "TensorFlow", "PyTorch", "OpenAI API"],
    featured: true,
    priority: 3,
  },
  {
    title: "Consultation",
    description:
      "Expert guidance to define your digital strategy and optimize processes.",
    category: "consulting",
    features: [
      "Strategy Planning",
      "Process Optimization",
      "Technology Roadmaps",
    ],
    technologies: ["Miro", "Notion", "Figma", "Jira"],
    featured: true,
    priority: 6,
  },
  {
    title: "Digital Marketing",
    description: "Increase brand visibility and grow your online presence.",
    category: "marketing",
    features: ["SEO & SEM", "Social Media Campaigns", "Content Strategy"],
    technologies: ["Google Ads", "Facebook Ads", "HubSpot", "Mailchimp"],
    featured: true,
    priority: 5,
  },
  {
    title: "UI/UX Design",
    description: "Design intuitive and engaging user experiences.",
    category: "design",
    features: ["Wireframing", "User Research", "Visual Design"],
    technologies: ["Figma", "Adobe XD", "Sketch", "InVision"],
    featured: true,
    priority: 4,
  },
];

export const projects = [
  {
    title: "E-commerce Platform",
    description:
      "A scalable online store with seamless checkout and high performance.",
    technologies: ["Next.js", "Node.js", "MongoDB", "Stripe"],
    features: [
      "User Authentication",
      "Secure Payments",
      "Admin Dashboard",
      "Product Management",
    ],
    featured: true,
    priority: 1,
  },
  {
    title: "Healthcare Dashboard",
    description: "Dashboard for managing patient records and analytics.",
    technologies: ["React", "Firebase", "Tailwind"],
    features: [
      "Patient Records Management",
      "Appointment Scheduling",
      "Analytics Dashboard",
      "Role-based Access",
    ],
    featured: true,
    priority: 3,
  },
  {
    title: "Mobile Banking App",
    description:
      "Secure mobile banking experience with real-time transactions.",
    technologies: ["React Native", "Node.js"],
    features: [
      "Real-time Transactions",
      "Secure Authentication",
      "Transaction History",
      "Push Notifications",
    ],
    featured: false,
    priority: 2,
  },
];

export const faqs = [
  {
    question: "How do I choose the right service?",
    answer: "We help you based on your goals and budget.",
    featured: true,
    priority: 2,
  },
  {
    question: "What is project timeline?",
    answer: "Usually 4–12 weeks depending on complexity.",
    featured: true,
    priority: 1,
  },
];

export const queries = [
  {
    name: "Ali Khan",
    email: "ali.khan@example.com",
    phone: "+92 300 1111111",
    projectType: "Web Development",
    budget: "$1k – $5k",
    timeline: "ASAP",
    message: "I need a business website with admin dashboard.",
    status: "new",
  },
  {
    name: "Sara Ahmed",
    email: "sara.ahmed@example.com",
    phone: "+92 300 2222222",
    projectType: "App Development",
    budget: "$5k – $10k",
    timeline: "1–2 Months",
    message: "Need a cross-platform mobile app.",
    status: "in-progress",
  },
  {
    name: "Usman Tariq",
    email: "usman.tariq@example.com",
    phone: "+92 300 3333333",
    projectType: "UI/UX Design",
    budget: "< $1k",
    timeline: "ASAP",
    message: "Need modern UI for existing app.",
    status: "completed",
  },
  {
    name: "Hassan Raza",
    email: "hassan.raza@example.com",
    phone: "+92 300 4444444",
    projectType: "Digital Marketing",
    budget: "$1k – $5k",
    timeline: "3+ Months",
    message: "Want to grow my online store.",
    status: "new",
  },
  {
    name: "Ayesha Noor",
    email: "ayesha.noor@example.com",
    phone: "+92 300 5555555",
    projectType: "Consultation",
    budget: "< $1k",
    timeline: "1–2 Months",
    message: "Need guidance on scaling product.",
    status: "in-progress",
  },
  {
    name: "Bilal Hussain",
    email: "bilal.hussain@example.com",
    phone: "+92 300 6666666",
    projectType: "AI Integration",
    budget: "$10k+",
    timeline: "3+ Months",
    message: "Integrate AI into workflows.",
    status: "new",
  },
];
export const testimonials = [
  {
    name: "Ali Khan",
    role: "Founder, StartupX",
    message:
      "Great experience. They understood our vision and delivered beyond expectations.",
    featured: true,
    priority: 5,
  },
  {
    name: "Sarah Ahmed",
    role: "Product Manager, TechFlow",
    message: "Outstanding communication and attention to detail.",
    featured: true,
    priority: 3,
  },
  {
    name: "Usman Tariq",
    role: "CEO, GrowthHub",
    message: "They helped us shape the entire product strategy.",
    featured: true,
    priority: 2,
  },
  {
    name: "Hassan Raza",
    role: "Entrepreneur",
    message: "Very professional team and smooth workflow.",
    featured: true,
    priority: 4,
  },
  {
    name: "Ayesha Noor",
    role: "Startup Founder",
    message: "Highly recommend for modern web solutions.",
    featured: true,
    priority: 1,
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
    label: "Happy Clients",
  },
  {
    value: 7,
    suffix: "+",
    label: "Active Projects",
  },
];
