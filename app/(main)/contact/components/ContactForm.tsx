"use client";

import React from "react";
import GlassCard from "@/app/components/GlassCard";
import Image from "next/image";
import QueryForm from "@/app/components/QueryForm";
import { ContactFormType } from "@/lib/validations/contact";
import toast from "react-hot-toast";
import { createQuery } from "./action";

const ContactForm = () => {
  const handleSubmit = async (data: ContactFormType): Promise<boolean> => {
    try {
      const res = await createQuery(data);

      if (res.success) {
        toast.success("Message sent successfully 🚀");
        return true;
      } else {
        toast.error(res.message || "Failed to send");
        return false;
      }
    } catch (error: unknown) {
      console.error("createQuery error:", error);

      const message =
        error instanceof Error ? error.message : "Something went wrong";

      toast.error(message);

      return false;
    }
  };

  return (
    <section className="relative w-full py-18 sm:py-28 px-6 md:px-12 border border-border overflow-hidden">
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
        <div className="space-y-7">
          <h2 className="text-2xl lg:hidden font-bold text-primary-dark">
            Start Your Project
          </h2>
          <GlassCard hasHoverGlow>
            <QueryForm onSubmit={handleSubmit} submitText="Send Message 🚀" />
          </GlassCard>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
