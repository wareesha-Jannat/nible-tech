import React from "react";
import Link from "next/link";
import GlassCard from "../GlassCard";
import { ServicePreview } from "./data";
import { iconMap } from "@/lib/utils";
import { Code } from "lucide-react";

type ServicesProps = {
  serviceData: ServicePreview[];
};

const Services = ({ serviceData }: ServicesProps) => {
  return (
    <>
      {/* Services Cards Grid */}
      <div className="grid grid-cols-1  lg:grid-cols-3 gap-8 px-8 mb-16">
        {serviceData.map((service, index) => (
          <GlassCard
            key={index}
            className="hover:bg-gray-50 cursor-pointer border-gray-100 transition-all duration-300"
            hasHoverGlow={true}
          >
            {/* Icon and Title Wrapper */}
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-5 mb-5 z-10">
              {/* Icon Box */}
              <div className="w-14 h-14 rounded-xl bg-primary/5 border border-primary/20 group-hover:border-primary/40 group-hover:bg-primary/10 flex items-center justify-center transition-colors duration-500 shrink-0">
                {React.createElement(iconMap[service.category] || Code, {
                  size: 28,
                  className: "text-primary-dark",
                })}
              </div>

              <h3 className="text-xl font-semibold text-primary-dark tracking-wide group-hover:text-primary transition-colors duration-300">
                {service.title}
              </h3>
            </div>

            {/* Quick description */}
            <p className="text-gray-600 leading-relaxed z-10 font-light text-[15px]">
              {service.description}
            </p>
          </GlassCard>
        ))}
      </div>

      {/* View All Services CTA */}
      <div className="flex justify-center mt-4">
        <Link
          href="/services"
          className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold text-primary bg-white border border-gray-300 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 hover:shadow-[0_4px_20px_rgba(124,58,237,0.2)] hover:-translate-y-1 active:scale-95 text-lg"
        >
          View All Services
          <svg
            className="w-5 h-5 ml-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </Link>
      </div>
    </>
  );
};

export default Services;
