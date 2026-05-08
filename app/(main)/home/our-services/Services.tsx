import React from "react";
import GlassCard from "@/app/components/GlassCard";
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
      <div className="grid lg:grid-cols-3 gap-8 px-6 sm:px-10 mb-16">
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
                {React.createElement(iconMap[service.title] || Code, {
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
              {service.shortDescription}
            </p>
            {/* Features */}
            {service.features?.length > 0 && (
              <div className="mt-6 grid sm:grid-cols-2 gap-x-6 gap-y-2">
                {service.features.slice(0, 6).map((feature, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-primary-dark text-sm">✔</span>
                    <span className="text-sm text-gray-600 leading-snug">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </GlassCard>
        ))}
      </div>
    </>
  );
};

export default Services;
