
import React from "react";
import { projects } from "@/app/utils/dummyData";
import Image from "next/image";

const OurWork = () => {
  return (
    <section className="w-full py-24 px-18 border border-border">
      <div className="max-w-7xl mx-auto flex flex-col gap-14">
        {/* Heading */}
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-dark">
              Work
            </span>
          </h2>
          <p className="text-gray-600">
            A selection of projects that showcase how we turn ideas into real,
            scalable digital products.
          </p>
        </div>

        {/* Projects */}
        {projects.map((project, index) => {
          const isReverse = index % 2 !== 0;

          return (
            <div
              key={project.id}
              className={`flex flex-col md:flex-row items-center gap-10 border border-primary-dark p-6 rounded-xl  ${
                isReverse ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Image */}
              <div className="w-full md:w-1/2">
                <div className="relative w-full h-[280px] md:h-[350px] rounded-xl overflow-hidden border border-border">
                  <Image
                    src={project.image}
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
      </div>
    </section>
  );
};

export default OurWork;
