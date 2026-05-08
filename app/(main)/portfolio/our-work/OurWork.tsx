import React from "react";
import Image from "next/image";
import { ProjectItem } from "@/lib/types";

const OurWork = ({ projectsData }: { projectsData: ProjectItem[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
      {projectsData.map((project) => {
        return (
          <div
            key={project._id}
            className="group flex flex-col rounded-xl border border-border bg-white shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            {/* Image */}
            <div className="relative w-full aspect-[16/10] overflow-hidden">
              <Image
                src={project.image?.url || "/default-cover.jpg"}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col gap-3">
              {/* Title */}
              <h3 className="text-lg font-semibold text-primary-dark leading-tight">
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                {project.description}
              </p>

              {/* Features (Bullet Style) */}
              {project.features?.length > 0 && (
                <ul className="space-y-1 text-sm text-gray-600">
                  {project.features.slice(0, 4).map((feature, idx) => (
                    <li key={idx} className="flex gap-2 leading-snug">
                      <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                      <span className="line-clamp-1">{feature}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.technologies.slice(0, 4).map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 text-[11px] bg-primary/10 text-primary-dark rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* CTA Row */}
              <div className="flex items-center justify-between mt-2">
                {project.demoUrl ? (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-primary hover:underline"
                  >
                    View Live →
                  </a>
                ) : (
                  <div /> // keeps spacing but shows nothing
                )}

                <span className="text-[10px] text-gray-400">Case Study</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OurWork;
