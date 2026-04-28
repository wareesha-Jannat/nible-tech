import Link from "next/link";
import React from "react";

const HeroSection = () => {
  return (
    <section className="relative w-full border-l border-r border-gray-200 flex items-center justify-center py-12 sm:py-24 text-foreground overflow-hidden">
      {/* === Light Background === */}
      <div className="absolute inset-0 bg-background -z-20" />

      {/* --- Smooth Animated Fluid Wave Background --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-primary/20 rounded-full blur-[100px] mix-blend-multiply opacity-60 animate-fluid-blob" />
        <div className="absolute top-[20%] right-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-purple-300/40 rounded-full blur-[100px] mix-blend-multiply opacity-60 animate-fluid-blob animation-delay-2000" />
        <div className="absolute bottom-[-20%] left-[20%] w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] bg-indigo-100/60 rounded-full blur-[120px] mix-blend-multiply opacity-60 animate-fluid-blob animation-delay-4000" />
      </div>

      {/* Increased horizontal padding & Centered Content Layout */}
      <div className="w-full px-8 md:px-16 lg:px-24 mx-auto flex flex-col items-center text-center relative z-10">
        {/* === Text & CTA Container === */}
        <div className="flex flex-col items-center space-y-8 max-w-4xl">
          {/* Overline Badge */}
          <div className="inline-block px-5 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary-dark font-medium text-sm tracking-widest uppercase">
            Digital Transformation Experts
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold leading-tight tracking-tight">
            Technology that <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-dark">
              Transforms Your Vision
            </span>
          </h1>

          {/* Paragraph text */}
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl leading-relaxed font-light">
            <strong className="text-primary-dark font-semibold">
              NibleTech
            </strong>{" "}
            is a modern IT startup focused on delivering high-end digital
            solutions. We take strategic, measured bites of complex challenges
            to deliver powerful, meaningful solutions that drive business
            growth.
          </p>

          {/* CTA Button */}
          <Link href="/contact">
            <button className="mt-4 bg-primary hover:bg-primary-dark text-white font-semibold py-4 px-10 rounded-xl transition-all duration-300 shadow-[0_4px_20px_rgba(124,58,237,0.3)] hover:shadow-[0_4px_30px_rgba(124,58,237,0.5)] hover:-translate-y-1 active:scale-95 text-lg">
              Start Your Transformation
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
