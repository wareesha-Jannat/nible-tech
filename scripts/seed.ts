import { connectDB } from "@/lib/db";

import { User } from "@/models/User";

import { Project } from "@/models/Project";
import { Testimonial } from "@/models/Testimonial";
import { Query } from "@/models/Query";
import { Faq } from "@/models/FAQ";
import Service from "@/models/Service";
import {
  user,
  services,
  projects,
  testimonials,
  queries,
  faqs,
  initialStats,
  blogs,
} from "@/lib/seed-data";
import { Stat } from "@/models/stat";
import { Blog } from "@/models/Blog";

export async function GET() {
  try {
    await connectDB();
    // ⚠️ optional: clear old data
    await User.deleteMany();
    await Service.deleteMany();
    await Project.deleteMany();
    await Testimonial.deleteMany();
    await Query.deleteMany();
    await Faq.deleteMany();
    await Stat.deleteMany();
    await Blog.deleteMany();
    // ✅ insert fresh data
    const createdUser = await User.create(user);
    const createdServices = await Service.insertMany(services);
    const createdProjects = await Project.insertMany(projects);
    const createdTestimonials = await Testimonial.insertMany(testimonials);
    const createdQueries = await Query.insertMany(queries);
    const createdFaqs = await Faq.insertMany(faqs);
    const createdStats = await Stat.insertMany(initialStats);
    const createdBlogs = await Blog.insertMany(blogs);
    return Response.json({
      message: "Database seeded successfully 🚀",
      data: {
        user: createdUser,
        services: createdServices.length,
        projects: createdProjects.length,
        testimonials: createdTestimonials.length,
        queries: createdQueries.length,
        faqs: createdFaqs.length,
        stats: createdStats.length,
        blogs: createdBlogs.length,
      },
    });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Seeding failed ❌" }, { status: 500 });
  }
}
