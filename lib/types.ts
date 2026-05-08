import { Category } from "./serviceDesignConfig";

export type ServiceFeature = {
  title: string;
  description: string;
};

export type ServiceItem = {
  _id: string;

  title: string;
  slug?: string;

  category: Category;

  shortDescription: string;
  overview: string;

  features: ServiceFeature[];

  technologies: string[];

  order: number;

  metaTitle?: string;
  metaDescription?: string;

  createdAt?: string;
  updatedAt?: string;
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

export type BlogItem = {
  _id: string;

  title: string;
  slug?: string;

  excerpt: string;

  content: string;

  coverImage: Image;
  createdAt?: string;
  updatedAt?: string;
};

export type TestimonialItem = {
  _id: string;
  name: string;
  role: string;
  message: string;
  image: Image;
  company?: string;
  createdAt?: string;
};
export type Image = {
  url: string;
  public_id: string;
};

export type ProjectItem = {
  _id: string;
  title: string;
  description: string;
  image: Image;
  features: string[];
  technologies: string[];
  demoUrl?: string;
  createdAt?: string;
  priority?: number;
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

export type FaqItem = {
  _id: string;
  question: string;
  answer: string;
  createdAt?: string;
  priority?: number;
};
export type StatItem = {
  _id: string;
  value: number;
  suffix: string;
  label: string;
};

export type UserItem = {
  id: string;
  name: string;
  email: string;
  image?: Image;
  role: "SUPER_ADMIN";
  createdAt?: string; // ISO string
  updatedAt?: string;
};

export type ChartData = {
  name: string;
  queries: number;
};

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  image?: string | null;
};
