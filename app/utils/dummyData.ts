import { Query, Service, Project, User, Stat } from "../../lib/types";
import { Stats } from "../../lib/types";

export const services: Service[] = [
  {
    id: "1",
    title: "Web Development",
    description:
      "We build modern, responsive, and scalable web applications tailored to your business needs, ensuring seamless user experiences and high performance.",
    category: "development",
    features: ["Responsive Design", "SEO Optimization", "High Performance"],
    technologies: ["React", "Next.js", "Node.js", "Tailwind CSS"],
    featured: true,
  },
  {
    id: "2",
    title: "App Development",
    description:
      "Create high-performance mobile applications for iOS and Android, delivering native-like experiences with cross-platform efficiency.",
    category: "mobile",
    features: [
      "Cross-platform Development",
      "Native Performance",
      "Push Notifications",
    ],
    technologies: ["React Native", "Flutter", "Swift", "Kotlin"],
    featured: true,
  },
  {
    id: "3",
    title: "AI Integration",
    description:
      "Integrate artificial intelligence into your workflows to automate tasks, gain insights, and improve decision-making across your organization.",
    category: "ai",
    features: [
      "Machine Learning Models",
      "Data Analysis Automation",
      "Smart Recommendations",
    ],
    technologies: ["Python", "TensorFlow", "PyTorch", "OpenAI API"],
    featured: true,
  },
  {
    id: "4",
    title: "Consultation",
    description:
      "Expert guidance to define your digital strategy, optimize processes, and align technology solutions with your business objectives.",
    category: "consulting",
    features: [
      "Strategy Planning",
      "Process Optimization",
      "Technology Roadmaps",
    ],
    technologies: ["Miro", "Notion", "Figma", "Jira"],
    featured: true,
  },
  {
    id: "5",
    title: "Digital Marketing",
    description:
      "Comprehensive digital marketing solutions to increase your brand visibility, attract qualified leads, and grow your online presence.",
    category: "marketing",
    features: ["SEO & SEM", "Social Media Campaigns", "Content Strategy"],
    technologies: ["Google Ads", "Facebook Ads", "HubSpot", "Mailchimp"],
    featured: true,
  },
  {
    id: "6",
    title: "UI/UX Design",
    description:
      "Design intuitive and engaging user experiences with modern interfaces that improve usability and drive conversions.",
    category: "design",
    features: ["Wireframing & Prototyping", "User Research", "Visual Design"],
    technologies: ["Figma", "Adobe XD", "Sketch", "InVision"],
    featured: true,
  },
];

export const faqs = [
  {
    id: "1",
    question: "How do I know which service is right for my business?",
    answer:
      "We help you choose the right solution based on your goals, budget, and timeline. You can also book a free consultation for personalized guidance.",
    featured: true,
  },
  {
    id: "2",
    question: "What is the typical timeline for a project?",
    answer:
      "Timelines vary depending on complexity. Most web and app projects take between 4–12 weeks, while more advanced solutions may take longer.",
    featured: true,
  },
  {
    id: "3",
    question: "Do you provide support after project delivery?",
    answer:
      "Yes, we offer ongoing support, maintenance, and updates to ensure your product continues to perform efficiently.",
    featured: true,
  },
  {
    id: "4",
    question: "Can I request custom features?",
    answer:
      "Absolutely. All our solutions are tailored to your needs, and we can build custom features specific to your business requirements.",
    featured: true,
  },
  {
    id: "5",
    question: "How do you ensure quality and performance?",
    answer:
      "We follow modern best practices, use proven technologies, and thoroughly test everything before delivery to ensure reliability and performance.",
    featured: true,
  },
];

export const projects: Project[] = [
  {
    id: "1",
    title: "E-commerce Platform",
    description:
      "A scalable online store with a seamless checkout experience and optimized performance for handling high traffic and conversions.",
    image: "/project-1.webp", // dummy for now
    technologies: ["Next.js", "Node.js", "MongoDB", "Stripe"],
    featured: true,
  },
  {
    id: "2",
    title: "Healthcare Dashboard",
    description:
      "A modern dashboard for managing patient records, appointments, and analytics with a clean and intuitive interface.",
    image: "/project-2.webp",
    technologies: ["React", "Firebase", "Tailwind"],
    createdAt: "2025-12-10T10:30:00Z",
    featured: true,
  },
  {
    id: "3",
    title: "Mobile Banking App",
    description:
      "A secure and intuitive mobile banking experience with real-time transactions and smooth user flows.",
    image: "/project-3.webp",
    technologies: ["React Native", "Node.js"],
    createdAt: "2026-01-05T14:15:00Z",
    featured: false,
  },
];

export const testimonials = [
  {
    id: "1",
    name: "Ali Khan",
    role: "Founder, StartupX",
    message:
      "Working with this team was a great experience. They understood our vision clearly and delivered a product that exceeded expectations.",
    image: "/avatar-2.jpg",
    featured: true,
  },
  {
    id: "2",
    name: "Sarah Ahmed",
    role: "Product Manager, TechFlow",
    message:
      "Their attention to detail and communication throughout the project was outstanding. Highly recommended for any serious business.",
    image: "/avatar-1.jpg",
    featured: true,
  },
  {
    id: "3",
    name: "Usman Tariq",
    role: "CEO, GrowthHub",
    message:
      "They didn’t just build our platform — they helped us think through the entire product strategy. That made a huge difference.",
    image: "/avatar-3.jpg",
    featured: true,
  },
  {
    id: "4",
    name: "Sarah Ahmed",
    role: "Product Manager, TechFlow",
    message:
      "Their attention to detail and communication throughout the project was outstanding. Highly recommended for any serious business.",
    image: "/avatar-1.jpg",
    featured: true,
  },
  {
    id: "5",
    name: "Usman Tariq",
    role: "CEO, GrowthHub",
    message:
      "They didn’t just build our platform — they helped us think through the entire product strategy. That made a huge difference.",
    image: "/avatar-3.jpg",
    featured: true,
  },
];

export const stats: Stats = {
  total: 25,
  new: 5,
  inProgress: 3,
  completed: 17,
};

export const weekData = [
  { name: "Mon", queries: 4 },
  { name: "Tue", queries: 6 },
  { name: "Wed", queries: 3 },
  { name: "Thu", queries: 8 },
  { name: "Fri", queries: 5 },
  { name: "Sat", queries: 7 },
  { name: "Sun", queries: 2 },
];

export const monthData = [
  { name: "Week 1", queries: 12 },
  { name: "Week 2", queries: 18 },
  { name: "Week 3", queries: 10 },
  { name: "Week 4", queries: 22 },
];

export const yearData = [
  { name: "Jan", queries: 30 },
  { name: "Feb", queries: 25 },
  { name: "Mar", queries: 40 },
  { name: "Apr", queries: 35 },
  { name: "May", queries: 50 },
  { name: "Jun", queries: 45 },
];

export const queries: Query[] = [
  {
    _id: "1",
    name: "Ali Khan",
    email: "ali.khan@example.com",
    phone: "+92 300 1111111",
    projectType: "Web Development",
    budget: "$1k – $5k",
    timeline: "ASAP",
    message: "I need a responsive business website with admin dashboard.",
    status: "new",
    createdAt: "2026-04-07T10:00:00Z",
    updatedAt: "2026-04-07T10:00:00Z",
  },
  {
    id: "2",
    name: "Sara Ahmed",
    email: "sara.ahmed@example.com",
    phone: "+92 300 2222222",
    projectType: "App Development",
    budget: "$5k – $10k",
    timeline: "1–2 Months",
    message: "Looking for a cross-platform mobile app for my startup.",
    status: "in-progress",
    createdAt: "2026-04-07T10:00:00Z",
    updatedAt: "2026-04-07T10:00:00Z",
  },
  {
    id: "3",
    name: "Usman Tariq",
    email: "usman.tariq@example.com",
    phone: "+92 300 3333333",
    projectType: "UI/UX Design",
    budget: "< $1k",
    timeline: "ASAP",
    message: "Need modern UI/UX design for an existing web app.",
    status: "completed",
    createdAt: "2026-04-07T10:00:00Z",
    updatedAt: "2026-04-07T10:00:00Z",
  },
  {
    id: "4",
    name: "Hassan Raza",
    email: "hassan.raza@example.com",
    phone: "+92 300 4444444",
    projectType: "Digital Marketing",
    budget: "$1k – $5k",
    timeline: "3+ Months",
    message: "Want to grow my online store using ads and SEO.",
    status: "new",
    createdAt: "2026-04-07T10:00:00Z",
    updatedAt: "2026-04-07T10:00:00Z",
  },
  {
    id: "5",
    name: "Ayesha Noor",
    email: "ayesha.noor@example.com",
    phone: "+92 300 5555555",
    projectType: "Consultation",
    budget: "< $1k",
    timeline: "1–2 Months",
    message: "Need guidance on scaling my tech product.",
    status: "in-progress",
    createdAt: "2026-04-07T10:00:00Z",
    updatedAt: "2026-04-07T10:00:00Z",
  },
  {
    id: "6",
    name: "Bilal Hussain",
    email: "bilal.hussain@example.com",
    phone: "+92 300 6666666",
    projectType: "AI Integration",
    budget: "$10k+",
    timeline: "3+ Months",
    message: "Looking to integrate AI into our internal workflows.",
    status: "new",
    createdAt: "2026-04-07T10:00:00Z",
    updatedAt: "2026-04-07T10:00:00Z",
  },
];

export const dummyUser: User = {
  id: "user_1",
  name: "Admin User",
  email: "admin@nibletech.com",
  image: "/avatar-1.jpg",
  role: "SUPER_ADMIN",
  createdAt: "2025-01-15T10:30:00.000Z",
  updatedAt: "2025-03-10T08:20:00.000Z",
};
