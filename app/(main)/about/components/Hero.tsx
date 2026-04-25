import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <>
      <section className="relative w-full flex items-center justify-center border-l border-r border-border py-16 overflow-hidden">
        {/* --- Smooth Animated Fluid Wave Background --- */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-primary/10 rounded-full blur-[100px] mix-blend-soft-light opacity-50 animate-fluid-blob" />
          <div className="absolute top-[20%] right-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-purple-300/20 rounded-full blur-[100px] mix-blend-multiply opacity-50 animate-fluid-blob animation-delay-2000" />
          <div className="absolute bottom-[-20%] left-[20%] w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] bg-indigo-100/30 rounded-full blur-[120px] mix-blend-soft-light opacity-50 animate-fluid-blob animation-delay-4000" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center justify-items-center mx-auto px-2 sm:px-16">
          <div className="relative z-20 text-center lg:text-start px-6 space-y-5 max-w-4xl">
            {/* Overline Badge */}
            <div className="inline-block px-5  py-2 rounded-full border border-primary/20 bg-primary/5 text-primary-dark font-medium text-sm tracking-widest uppercase">
              About Nible Technology
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-primary-dark mb-6 leading-tight">
              We build modern, scalable web solutions that help businesses{" "}
              <span className="text-primary-light">
                turn ideas into real, working products.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-primary-dark font-light leading-relaxed">
              Focused on performance, clean architecture, and real-world impact.
            </p>
            <Link href={"#learn-more"}>
              <button className="mt-4 bg-primary hover:bg-primary-dark text-white font-semibold py-4 px-10 rounded-xl transition-all duration-300 shadow-[0_4px_20px_rgba(124,58,237,0.3)] hover:shadow-[0_4px_30px_rgba(124,58,237,0.5)] hover:-translate-y-1 active:scale-95 text-lg">
                Learn More
              </button>
            </Link>
          </div>
          <div className="hidden lg:inline-block">
            <Image
              src={"/laptop-illustration.png"}
              alt="laptop illustration"
              priority
              height={400}
              width={400}
              className="aspect-auto hover:scale-105 hover:-translate-0.5 transition-all duration-500 "
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
