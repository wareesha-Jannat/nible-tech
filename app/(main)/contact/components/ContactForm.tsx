"use client";

import React from "react";
import GlassCard from "@/app/components/GlassCard";
import Image from "next/image";
import QueryForm from "@/app/components/QueryForm";
import { ContactFormType } from "@/lib/validations/contact";

const ContactForm = () => {
  const onSubmit = (data: ContactFormType) => {
    console.log("Form Data:", data);
  };

  return (
    <section className="relative w-full py-28 px-6 md:px-12 border border-border overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* LEFT */}
        <div className="space-y-6 hidden lg:inline-block">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-dark">
            Start Your Project
          </h2>

          <p className="text-gray-600 text-lg max-w-md">
            Tell us about your idea and we’ll get back to you within 24 hours.
          </p>

          <Image
            src={"/contact-illustration.png"}
            alt="contact illustration"
            height={800}
            width={800}
            className="hover:scale-105 transition-all duration-500"
          />
        </div>

        {/* RIGHT */}
        <GlassCard hasHoverGlow>
          <QueryForm onSubmit={onSubmit} submitText="Send Message 🚀" />
        </GlassCard>
      </div>
    </section>
  );
};

export default ContactForm;
