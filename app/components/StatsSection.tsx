"use client";
import React, { useEffect, useState, useRef } from "react";
import GlassCard from "./GlassCard";

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

const StatsSection = () => {
  return (
    <section className="relative w-full border-l border-r border-gray-200 py-24 text-foreground border-t bg-background overflow-hidden">
      {/* 
        Background ambient glow: 
        Made much brighter and expanded to two crossing orbs (Purple & Blue) for a premium highly-noticeable gradient
      */}
      <div className="absolute top-[60%] left-[30%] -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/20 rounded-full blur-[140px] -z-10" />
      <div className="absolute top-[80%] right-[30%] translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[140px] -z-10" />

      {/* Container - matching width style of other sections */}
      <div className="w-full px-6 flex flex-col items-center">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-extrabold mb-18 text-center text-primary-dark">
          Trusted by Innovative Startups
        </h2>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 px-8 w-full max-w-[1000px] mb-24">
          {/* Stat 1 */}
          <GlassCard className="items-center justify-center">
            <h3 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-primary mb-3">
              <Counter end={24} />
              <span className="text-primary">+</span>
            </h3>
            <p className="text-gray-600 font-medium tracking-widest uppercase text-xs md:text-sm text-center">
              Projects Delivered
            </p>
          </GlassCard>

          {/* Stat 2 */}
          <GlassCard className="items-center justify-center">
            <h3 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-primary mb-3">
              <Counter end={18} />
              <span className="text-primary">+</span>
            </h3>
            <p className="text-gray-600 font-medium tracking-widest uppercase text-xs md:text-sm text-center">
              Happy Clients
            </p>
          </GlassCard>

          {/* Stat 3 */}
          <GlassCard className="items-center justify-center">
            <h3 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-primary mb-3">
              <Counter end={7} />
              <span className="text-primary">+</span>
            </h3>
            <p className="text-gray-600 font-medium tracking-widest uppercase text-xs md:text-sm text-center">
              Active Projects
            </p>
          </GlassCard>
        </div>

        {/* Tech Stack / Partners Row */}
        <div className="w-full max-w-[1200px] flex flex-col items-center justify-center pt-12 border-t border-gray-200">
          <p className="text-gray-500 mb-12 uppercase tracking-widest text-xl font-semibold">
            Powered by Modern Technology
          </p>

          {/* Flex Wrap logo container */}
          <div className="flex flex-wrap justify-center gap-12 md:gap-20 items-center w-full px-4">
            {/* React */}
            <div className="flex items-center space-x-3 text-[#61DAFB] transition-colors duration-500  group">
              <svg
                viewBox="-11.5 -10.23174 23 20.46348"
                className="w-12 h-12 group-hover:drop-shadow-[0_0_10px_rgba(97,218,251,0.5)] transition-all"
                fill="currentColor"
              >
                <circle cx="0" cy="0" r="2.05" fill="currentColor" />
                <g stroke="currentColor" strokeWidth="1" fill="none">
                  <ellipse rx="11" ry="4.2" />
                  <ellipse rx="11" ry="4.2" transform="rotate(60)" />
                  <ellipse rx="11" ry="4.2" transform="rotate(120)" />
                </g>
              </svg>
              <span className="font-bold text-xl hidden sm:block">React</span>
            </div>

            {/* JavaScript (Stylized Text box) */}
            <div className="flex items-center space-x-3 text-[#F7DF1E] transition-colors duration-500 group">
              <div className="w-10 h-10 border-[2.5px] border-current font-bold text-xl flex items-end justify-end p-0.5 rounded-sm group-hover:drop-shadow-[0_0_10px_rgba(247,223,30,0.5)] transition-all">
                JS
              </div>
              <span className="font-bold text-xl hidden sm:block">
                JavaScript
              </span>
            </div>

            {/* Tailwind CSS */}
            <div className="flex items-center space-x-1 text-[#38B2AC] transition-colors duration-500  group">
              <svg
                viewBox="0 0 24 24"
                className="w-14 h-14 group-hover:drop-shadow-[0_0_10px_rgba(56,178,172,0.5)] transition-all"
                fill="currentColor"
              >
                <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.625 C13.666,10.604,15.053,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.625 C16.337,6.196,14.95,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.625 c1.177,1.18,2.564,2.575,5.512,2.575c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.625 C10.337,13.396,8.95,12,6.001,12z" />
              </svg>
              <span className="font-bold text-xl hidden sm:block -ml-1">
                Tailwind
              </span>
            </div>

            {/* MongoDB */}
            <div className="flex items-center space-x-2 text-[#47A248] transition-colors duration-500  group">
              <svg
                viewBox="0 0 24 24"
                className="w-10 h-10 group-hover:drop-shadow-[0_0_10px_rgba(71,162,72,0.5)] transition-all"
                fill="currentColor"
              >
                <path d="M12 2C9.5 5 8 9 8 13c0 4.5 4 8 4 8s4-3.5 4-8c0-4-1.5-8-4-13z" />
              </svg>
              <span className="font-bold text-xl hidden sm:block">MongoDB</span>
            </div>

            {/* AWS (Stylized Text) */}
            <div className="flex items-center space-x-2 text-[#FF9900] transition-colors duration-500  group">
              <span className="font-extrabold text-4xl tracking-tighter mt-1 group-hover:drop-shadow-[0_0_10px_rgba(255,153,0,0.5)] transition-all">
                aws
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
