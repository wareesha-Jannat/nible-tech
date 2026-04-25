import GlassCard from "@/app/components/GlassCard";
import {
  Code
} from "lucide-react";
import React from "react";
import { ServiceItem } from "@/lib/types";
import { iconMap } from "@/lib/utils";

type ServicesProps = {
  serviceData: ServiceItem[];
};

const WhatWeOffer = ({ serviceData }: ServicesProps) => {
  return (
    <>
        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 w-full">
          {serviceData.map((service: ServiceItem) => (
            <GlassCard
              key={service._id}
              className="flex flex-row items-start space-x-6 p-6"
              hasHoverGlow
            >
              <div className="w-16 h-16 flex items-center justify-center bg-primary/10 rounded-xl border border-primary/20 group-hover:border-primary/40 group-hover:bg-primary/20 transition-colors duration-500 shrink-0 mb-3">
                {React.createElement(iconMap[service.category] || Code, {
                  size: 28,
                  className: "text-primary-dark",
                })}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary-dark mb-2 group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-600 font-light text-[15px] leading-relaxed">
                  {service.description}
                </p>
                <ul className="mt-2 text-sm text-gray-500 list-disc list-inside">
                  {service.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
                <div className="mt-2 flex flex-wrap gap-2">
                  {service.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="bg-primary/10 text-primary-dark px-2 py-1 rounded text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
     </>
  );
};

export default WhatWeOffer;
