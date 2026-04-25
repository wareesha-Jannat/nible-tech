import Image from "next/image";
import Link from "next/link";
import React from "react";

const PortfolioHero = () => {
  return (
    <section className="relative w-full flex items-center justify-center border-l border-r border-border py-18 overflow-hidden ">
      {/* --- Smooth Animated Fluid Wave Background --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-primary/10 rounded-full blur-[100px] mix-blend-soft-light opacity-50 animate-fluid-blob" />
        <div className="absolute top-[20%] right-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-purple-300/20 rounded-full blur-[100px] mix-blend-multiply opacity-50 animate-fluid-blob animation-delay-2000" />
        <div className="absolute bottom-[-20%] left-[20%] w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] bg-indigo-100/30 rounded-full blur-[120px] mix-blend-soft-light opacity-50 animate-fluid-blob animation-delay-4000" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center justify-items-center mx-auto md:px-14 ">
        <div className="relative z-20 text-center lg:text-start px-6 space-y-7">
          {/* Overline Badge */}
          <div className="inline-block px-5 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary-dark font-medium text-sm tracking-widest uppercase">
            Our Work That Delivers Results
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-primary-dark mb-6 leading-tight">
            We design and build digital products that solve real problems.{" "}
          </h1>
          <p className="text-lg md:text-xl text-primary-dark font-light leading-relaxed">
            Each project reflects our focus on clarity, performance, and impact.
          </p>

          <div className="flex flex-col items-center justify-center lg:justify-start sm:flex-row gap-5 w-full sm:w-auto">
            <Link
              href={"#our-work"}
              className="inline-flex items-center justify-center px-10 py-4 rounded-xl font-bold text-white bg-primary hover:bg-primary-dark transition-all duration-300 shadow-[0_4px_15px_rgba(124,58,237,0.2)] hover:shadow-[0_4px_25px_rgba(124,58,237,0.4)] hover:-translate-y-0.5 active:scale-95 text-lg"
            >
              See Our Work
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center px-10 py-4 rounded-xl font-bold text-primary bg-white border border-gray-300 hover:bg-gray-50 hover:border-primary transition-all duration-300 hover:-translate-y-0.5 active:scale-95 text-lg"
            >
              Work With Us
            </Link>
          </div>
        </div>
        <div className="hidden lg:inline-block">
          <Image
            src={"/portfolio-illustration.png"}
            alt="portfolio illustration"
            priority
            height={400}
            width={400}
            className="aspect-auto hover:scale-105 hover:-translate-0.5 transition-all duration-500 "
          />
        </div>
      </div>
    </section>
  );
};

export default PortfolioHero;
