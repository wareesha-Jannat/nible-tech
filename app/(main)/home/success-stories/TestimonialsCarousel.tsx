"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import GlassCard from "@/app/components/GlassCard";
import { TestimonialItem } from "@/lib/types";

type Props = {
  testimonials: TestimonialItem[];
};

// -----------------------------
// Component
// -----------------------------
export default function TestimonialsCarousel({ testimonials }: Props) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const len = testimonials.length;

  if (!len) return null;

  const getIndex = (offset: number) => (index + offset + len) % len;

  const visible = [
    { item: testimonials[getIndex(-1)], pos: "left" as const },
    { item: testimonials[getIndex(0)], pos: "center" as const },
    { item: testimonials[getIndex(1)], pos: "right" as const },
  ];

  const next = () => {
    setDirection(1);
    setIndex((p) => (p + 1) % len);
  };

  const prev = () => {
    setDirection(-1);
    setIndex((p) => (p - 1 + len) % len);
  };

  // -----------------------------
  // Motion variants (KEY PART)
  // -----------------------------
  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 120 : -120,
      opacity: 0,
      scale: 0.85,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      zIndex: 2,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -120 : 120,
      opacity: 0,
      scale: 0.85,
    }),
  };

  const spring = {
    type: "spring" as const,
    stiffness: 80,
    damping: 20,
  };

  return (
    <section className="pb-28 pt-18 sm:py-0 px-6">
      <div className="max-w-6xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold">Success Stories</h2>
        <p className="text-muted-foreground mt-2 mb-14">
          Real results from real businesses
        </p>

        {/* Carousel */}
        <div className="relative flex items-center justify-center">
          {/* Left Button */}
          <button
            onClick={prev}
            className="absolute left-0 z-20 p-3 rounded-full bg-white shadow-md hover:scale-105 transition"
          >
            <ChevronLeft />
          </button>

          {/* Cards */}
          <div className="relative flex items-center justify-center gap-6 w-full">
            <AnimatePresence mode="popLayout" custom={direction}>
              {visible.map(({ item, pos }) => (
                <motion.div
                  key={item._id + pos}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate={
                    pos === "center"
                      ? "center"
                      : {
                          x: pos === "left" ? -60 : 60,
                          scale: 0.9,
                          opacity: 0.5,
                        }
                  }
                  exit="exit"
                  transition={spring}
                  className={`
                    absolute md:relative
                   w-full max-w-[360px] min-w-[250px]
                  `}
                >
                  <TestimonialCard data={item} highlight={pos === "center"} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Right Button */}
          <button
            onClick={next}
            className="absolute right-0 z-20 p-3 rounded-full bg-white shadow-md hover:scale-105 transition"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}

// -----------------------------
// Card
// -----------------------------
function TestimonialCard({
  data,
  highlight,
}: {
  data: TestimonialItem;
  highlight?: boolean;
}) {
  return (
    <GlassCard
      hasHoverGlow
      className={`
        min-h-[320px]
        flex flex-col justify-between
        p-6
        transition-all duration-300
        ${highlight ? "border-primary shadow-lg scale-105" : "opacity-80"}
      `}
    >
      {/* Message */}
      <div className="flex flex-col gap-4">
        <Quote className="text-primary/30" size={26} />

        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
          “{data.message}”
        </p>
      </div>

      {/* Divider */}
      <div className="h-[2px] w-full bg-gradient-to-r from-primary/40 via-primary/10 to-transparent rounded-full my-6" />

      {/* User */}
      <div className="flex items-center gap-4 mx-auto">
        <div className="w-14 h-14 rounded-full overflow-hidden border bg-gray-100 relative">
          <Image
            src={data.image?.url || "/avatar-placeholder.png"}
            alt={data.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex flex-col items-start justify-center min-w-0 flex-1">
          <h4 className="font-semibold text-primary-dark truncate w-full">
            {data.name}
          </h4>

          <p className="text-sm text-muted-foreground truncate w-full">
            {data.role}
          </p>

          {data.company && (
            <p className="text-xs text-muted-foreground/70 truncate w-full">
              {data.company}
            </p>
          )}
        </div>
      </div>
    </GlassCard>
  );
}
