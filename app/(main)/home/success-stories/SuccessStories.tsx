import React from "react";
import Image from "next/image";
import { ProjectItem, TestimonialItem } from "@/lib/types";
import Link from "next/link";
import TestimonialsCarousel from "./TestimonialsCarousel";

type SuccessStoriesProps = {
  projectsData: ProjectItem[];
  testimonialsData: TestimonialItem[];
};

const SuccessStories = ({
  projectsData,
  testimonialsData,
}: SuccessStoriesProps) => {
  return (
    <>
      <section className="space-y-10  max-w-6xl mx-auto">
        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsData.slice(0, 3).map((project) => (
            <div
              key={project._id}
              className="group flex flex-col border border-primary-dark/20 rounded-xl overflow-hidden bg-white hover:shadow-xl transition-all duration-300"
            >
              {/* Image (CONTROLLED HEIGHT) */}
              <div className="relative w-full h-[180px] sm:h-[200px] overflow-hidden">
                <Image
                  src={project.image?.url || "/default-cover.jpg"}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col gap-3 flex-1">
                <h3 className="text-lg font-semibold text-primary-dark leading-tight">
                  {project.title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                  {project.description}
                </p>

                {/* Features */}
                {project.features?.length > 0 && (
                  <ul className="space-y-1">
                    {project.features.slice(0, 2).map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex gap-2 text-sm text-gray-600"
                      >
                        <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                        <span className="line-clamp-1">{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.technologies.slice(0, 3).map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 text-[11px] bg-primary/10 text-primary-dark rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <Link
            href="/portfolio"
            className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:scale-105 transition-all"
          >
            Explore More Work
          </Link>
        </div>
      </section>
      <TestimonialsCarousel testimonials={testimonialsData} />
    </>
  );
};

export default SuccessStories;
