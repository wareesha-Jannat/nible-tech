import React from 'react';
import Link from 'next/link';

const CtaSection = () => {
  return (
    <section className="relative w-full border-l border-r border-gray-200 py-20 md:py-30 px-4 sm:px-8 text-foreground border-t overflow-hidden">

      {/* Intense Center Glow for CTA focus */}
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[120px] -z-10" />

      <div className=" px-6 flex flex-col items-center text-center relative z-10">

        {/* Subtle Badge */}
        <div className="inline-block px-5 py-2 rounded-full border border-primary/40 bg-primary/5 text-primary-dark font-semibold text-sm mb-10 tracking-widest uppercase">
          Let&apos;s Work Together
        </div>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-8 leading-tight">
          Ready to Transform Your <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-dark">Business Idea?</span>
        </h2>

        <p className="text-gray-600 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed font-light">
          Get in touch with us for a free consultation. Our team of experts is ready to architect and build the perfect digital solution for your specific needs.
        </p>

        <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-10 py-4 rounded-xl font-bold text-white bg-primary hover:bg-primary-dark transition-all duration-300 shadow-[0_4px_20px_rgba(124,58,237,0.3)] hover:shadow-[0_4px_30px_rgba(124,58,237,0.5)] hover:-translate-y-1 active:scale-95 text-lg"
          >
            Get a Free Consultation
          </Link>
          <Link
            href="/portfolio"
            className="inline-flex items-center justify-center px-10 py-4 rounded-xl font-bold text-primary bg-white border border-gray-300 hover:bg-gray-50 hover:border-primary transition-all duration-300 hover:-translate-y-1 active:scale-95 text-lg"
          >
            View Our Work
          </Link>
        </div>

      </div>
    </section>
  );
};

export default CtaSection;
