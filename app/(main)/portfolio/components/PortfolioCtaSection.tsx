"use client";

import React from "react";
import Link from "next/link";

const PortfolioCtaSection = () => {
  return (
    <section className="w-full py-24 px-6 border-t border-l border-r border-gray-200 bg-background text-foreground">
      <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold mb-6 leading-tight">
          Like what you see?{" "}
          <span className="text-primary">Let’s build yours.</span>
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed font-light">
          We turn ideas into real, working products. If you’re looking to build
          something impactful, our team is ready to help you bring it to life.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-10 py-4 rounded-xl font-semibold text-white bg-primary hover:bg-primary-dark transition-all duration-300 hover:-translate-y-0.5 active:scale-95 text-lg shadow-md"
          >
            Start Your Project
          </Link>

          <Link
            href="/services"
            className="inline-flex items-center justify-center px-10 py-4 rounded-xl font-semibold text-gray-700 border border-gray-300 hover:border-primary hover:text-primary transition-all duration-300 hover:-translate-y-0.5 active:scale-95 text-lg"
          >
            Explore Services
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PortfolioCtaSection;
