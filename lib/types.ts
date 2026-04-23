export type ServiceItem = {
  _id: string;
  title: string;
  description: string;
  category: string;
  features: string[];
  technologies: string[];
  featured: boolean;
  priority: number;
};

export type Stats = {
  total: number;
  new: number;
  inProgress: number;
  completed: number;
};

export type QueryItem = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
};

export type QueriesPage = {
  queries: QueryItem[];
  nextCursor: string;
};

export type TestimonialItem = {
  _id: string;
  name: string;
  role: string;
  message: string;
  image: UserImage;
  featured: boolean;
  createdAt?: string;
};
export type UserImage = {
  url: string;
  public_id: string;
};

export type ProjectItem = {
  _id: string;
  title: string;
  description: string;
  image: UserImage;
  features: string[];
  technologies: string[];
  featured: boolean;
  createdAt?: string;
};

export type ServicesPage = {
  services: ServiceItem[];
  nextCursor: string | null;
  featureCount: number;
};

export type TestimonialsPage = {
  testimonials: TestimonialItem[];
  nextCursor: string | null;
  featureCount: number;
};

export type ProjectsPage = {
  projects: ProjectItem[];
  nextCursor: string | null;
  featureCount: number;
};
export type FaqsPage = {
  faqs: FaqItem[];
  nextCursor: string | null;
  featureCount: number;
};

export type FaqItem = {
  _id: string;
  question: string;
  answer: string;
  featured: boolean;
  createdAt?: string;
};
export type StatItem = {
  _id: string;
  value: number;
  suffix: string;
  label: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  image?: UserImage | null;
  role: "SUPER_ADMIN";
  createdAt: string; // ISO string
  updatedAt?: string;
};

export type ChartData = {
  name: string;
  queries: number;
};
