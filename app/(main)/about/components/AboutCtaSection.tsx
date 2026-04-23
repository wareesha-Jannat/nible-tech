import React from "react";
import Link from "next/link";

const AboutCtaSection = () => {
  return (
    <section className="relative w-full border border-border py-28 text-foreground overflow-hidden">
      {/* Subtle background blobs */}
      <div className="absolute top-[-20%] left-[30%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] animate-[blobMove1_20s_ease-in-out_infinite] -z-10" />
      <div className="absolute bottom-[-15%] right-[20%] w-[500px] h-[500px] bg-purple-400/10 rounded-full blur-[120px] animate-[blobMove2_25s_ease-in-out_infinite] -z-10" />

      <div className="w-full max-w-4xl mx-auto px-6 flex flex-col items-center text-center relative z-10">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">
          Curious to Learn More About <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-dark">
            Our Team & Process?
          </span>
        </h2>

        <p className="text-gray-600 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed font-light">
          We’d love to share how our team collaborates, creates, and brings
          ideas to life. Connect with us and discover how we can work together
          to make your vision real.
        </p>

        <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-10 py-4 rounded-xl font-bold text-white bg-primary hover:bg-primary-dark transition-all duration-300 shadow-[0_4px_15px_rgba(124,58,237,0.2)] hover:shadow-[0_4px_25px_rgba(124,58,237,0.4)] hover:-translate-y-0.5 active:scale-95 text-lg"
          >
            Reach Out to Us
          </Link>
          <Link
            href="/portfolio"
            className="inline-flex items-center justify-center px-10 py-4 rounded-xl font-bold text-primary bg-white border border-gray-300 hover:bg-gray-50 hover:border-primary transition-all duration-300 hover:-translate-y-0.5 active:scale-95 text-lg"
          >
            See Our Work
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutCtaSection;
