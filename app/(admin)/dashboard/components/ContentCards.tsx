"use client";

import React from "react";
import GlassCard from "@/app/components/GlassCard";
import {
  BarChart,
  Briefcase,
  Star,
  Wrench,
  HelpCircle,
  Mail,
} from "lucide-react";
import Link from "next/link";

const contentItems = [
  {
    title: "Stats",
    description: "Manage homepage statistics",
    icon: <BarChart className="w-8 h-8 text-primary" />,
    href: "/content#stats",
  },
  {
    title: "Projects",
    description: "Add and manage portfolio projects",
    icon: <Briefcase className="w-8 h-8 text-indigo-500" />,
    href: "/content#projects",
  },
  {
    title: "Testimonials",
    description: "Manage client feedback",
    icon: <Star className="w-8 h-8 text-yellow-500" />,
    href: "/content#testimonials",
  },
  {
    title: "Services",
    description: "Update services offered",
    icon: <Wrench className="w-8 h-8 text-green-500" />,
    href: "/content#services",
  },
  {
    title: "FAQs",
    description: "Edit frequently asked questions",
    icon: <HelpCircle className="w-8 h-8 text-purple-500" />,
    href: "/content#faqs",
  },
  {
    title: "Queries",
    description: "View and manage client inquiries",
    icon: <Mail className="w-8 h-8 text-blue-500" />,
    href: "/queries",
  },
];

const ContentCards = () => {
  return (
    <section className="w-full py-14 px-10 md:px-14 border border-border">
      {/* Title */}
      <div className="mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-primary-dark">
          Manage Content
        </h2>
        <p className="text-gray-500 mt-2 text-sm">
          Control and update different sections of your website
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {contentItems.map((item) => (
          <Link key={item.title} href={item.href}>
            <GlassCard className="relative p-6 flex flex-col justify-between cursor-pointer group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              {/* Icon */}
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-lg bg-gray-100 group-hover:scale-105 transition">
                  {item.icon}
                </div>
              </div>

              {/* Text */}
              <div>
                <h3 className="text-lg font-semibold text-primary-dark">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{item.description}</p>
              </div>
            </GlassCard>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ContentCards;
