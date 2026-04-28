"use client";

import Link from "next/link";
import { MessageCircle, Phone, Mail, Code } from "lucide-react";

const ContactHero = () => {
  return (
    <section className="relative w-full flex items-center justify-center border-l border-r border-border py-24 overflow-hidden">
      {/* 🌊 Background Blobs */}
      {/* --- Smooth Animated Fluid Wave Background --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-primary/20 rounded-full blur-[100px] mix-blend-multiply opacity-60 animate-fluid-blob" />
        <div className="absolute top-[20%] right-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-purple-300/40 rounded-full blur-[100px] mix-blend-multiply opacity-60 animate-fluid-blob animation-delay-2000" />
        <div className="absolute bottom-[-20%] left-[20%] w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] bg-indigo-100/60 rounded-full blur-[120px] mix-blend-multiply opacity-60 animate-fluid-blob animation-delay-4000" />
      </div>

      {/* ✨ Floating Icons */}
      <div className="pointer-events-none absolute inset-0">
        <MessageCircle className="absolute top-[15%] left-[8%] w-10 h-10 text-primary/30 animate-float" />
        <Phone className="absolute top-[10%] right-[12%] w-8 h-8 text-primary/30 animate-float animation-delay-2000" />
        <Mail className="absolute bottom-[50%] left-[25%] w-8 h-8 text-primary/30 animate-float animation-delay-4000" />
        <Code className="absolute bottom-[40%] right-[18%] w-10 h-10 text-primary/30 animate-float animation-delay-3000" />
      </div>

      {/* 🧱 Content */}
      <div className="flex flex-col items-center justify-center text-center mx-auto px-6 md:px-10 max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-bold text-primary-dark mb-6 leading-tight">
          Let’s Build Something Amazing Together
        </h1>

        <p className="text-lg md:text-xl text-primary-dark/80 font-light leading-relaxed mb-8">
          Have an idea or project in mind? Let’s discuss how we can bring it to
          life.
        </p>

        <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
          <Link
            href="#contact-form"
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-white bg-primary hover:bg-primary-dark transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-95 text-lg"
          >
            Start a Project
          </Link>

          <Link
            href="https://wa.me/923XXXXXXXXX"
            target="_blank"
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-primary bg-white border border-gray-300 hover:bg-gray-50 hover:border-primary transition-all duration-300 hover:-translate-y-1 active:scale-95 text-lg"
          >
            WhatsApp Chat
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;
