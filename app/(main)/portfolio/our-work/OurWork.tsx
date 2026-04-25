import React from "react";
import Image from "next/image";
import { ProjectItem } from "@/lib/types";

const OurWork = ({ projectsData }: { projectsData: ProjectItem[] }) => {
  return (
    <>
      {/* Projects */}
      {projectsData.map((project, index) => {
        const isReverse = index % 2 !== 0;

        return (
          <div
            key={project._id}
            className={`flex flex-col md:flex-row items-center gap-10 border border-primary-dark p-6 rounded-xl  ${
              isReverse ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Image */}
            <div className="w-full md:w-1/2">
              <div className="relative w-full aspect-[16/10] md:aspect-[16/9] rounded-xl overflow-hidden border border-border">
                <Image
                  src={project.image?.url || "/default-cover.jpg"}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Content */}
            <div className="w-full md:w-1/2">
              <h3 className="text-2xl font-bold text-primary-dark mb-4">
                {project.title}
              </h3>

              <p className="text-gray-600 mb-6 leading-relaxed">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-sm bg-primary/10 text-primary-dark rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default OurWork;
