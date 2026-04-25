"use client";
import React, { useEffect, useState, useRef } from "react";
import GlassCard from "@/app/components/GlassCard";
import { StatItem } from "@/lib/types";

// Custom lightweight animated counter component
const Counter = ({
  end,
  duration = 2000,
}: {
  end: number;
  duration?: number;
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    // Only start counting when the user scrolls down to this section!
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.5 }, // Triggers when 50% of the number is visible
    );

    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (inView) {
      let start = 0;
      // Calculate how much to add every ~16ms (roughly 60 frames per second)
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer); // Stop when we reach the actual number
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [inView, end, duration]);

  return <span ref={ref}>{count}</span>;
};

const Stats = ({ statsData }: { statsData: StatItem[] }) => {
  return (
    <>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 px-8 w-full max-w-[1000px] mb-24">
        {statsData.map((stat) => (
          <GlassCard key={stat._id} className="items-center justify-center">
            <h3 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-primary mb-3">
              <Counter end={stat.value} />
              {stat.suffix && (
                <span className="text-primary">{stat.suffix}</span>
              )}
            </h3>

            <p className="text-gray-600 font-medium tracking-widest uppercase text-xs md:text-sm text-center">
              {stat.label}
            </p>
          </GlassCard>
        ))}
      </div>
    </>
  );
};

export default Stats;
