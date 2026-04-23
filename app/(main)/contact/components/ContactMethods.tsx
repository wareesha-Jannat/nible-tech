"use client";

import React from "react";
import GlassCard from "@/app/components/GlassCard";
import { MessageCircle, Phone, Mail, Calendar } from "lucide-react";
import Link from "next/link";

const ContactMethods = () => {
  return (
    <section className="relative w-full py-20 px-6 md:px-12 border border-border text-foreground overflow-hidden">
      {/* Background blobs (keep same) */}

      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-gradient-to-tr from-indigo-500/20 via-pink-300/20 to-purple-400/20 rounded-full blur-[150px] animate-[blobMove2_20s_ease-in-out_infinite] -z-10" />

      <div className="w-full max-w-7xl mx-auto flex flex-col items-center">
        {/* Heading */}
        <div className="space-y-4 mb-16 ">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold">
            Choose How You{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-dark">
              Connect
            </span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl leading-relaxed">
            Reach out through your preferred channel — we’re just one click
            away.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1  md:grid-cols-2 md:gap-12 gap-8 md:px-10 px-6 w-full">
          {/* WhatsApp (highlighted) */}
          <GlassCard className="space-y-3" hasHoverGlow>
            <div className="w-14 h-14 flex items-center justify-center bg-green-500/10 rounded-xl border border-green-500/20 mb-3">
              <MessageCircle size={26} className="text-green-600" />
            </div>

            <h3 className="text-xl font-semibold text-primary-dark mb-1">
              WhatsApp Chat
            </h3>

            <p className="text-gray-600 text-sm">
              Get quick responses and discuss your project instantly.
            </p>

            <Link
              href="https://wa.me/923XXXXXXXXX"
              target="_blank"
              className="mt-2 inline-block text-sm font-semibold text-green-600 hover:underline"
            >
              Chat Now →
            </Link>
          </GlassCard>

          {/* Call */}
          <GlassCard className="flex flex-col space-y-8" hasHoverGlow>
            <div className="w-14 h-14 flex items-center justify-center bg-primary/10 rounded-xl border border-primary/20 mb-3">
              <Phone size={26} className="text-primary-dark" />
            </div>

            <h3 className="text-xl font-semibold text-primary-dark mb-1">
              Call Us
            </h3>

            <p className="text-gray-600 text-sm">
              Speak directly with our team for quick discussions.
            </p>

            <Link
              href="tel:+923XXXXXXXXX"
              className="mt-2 inline-block text-sm font-semibold text-primary hover:underline"
            >
              Call Now →
            </Link>
          </GlassCard>

          {/* Email */}
          <GlassCard className="flex flex-col space-y-8 " hasHoverGlow>
            <div className="w-14 h-14 flex items-center justify-center bg-primary/10 rounded-xl border border-primary/20 mb-3">
              <Mail size={26} className="text-primary-dark" />
            </div>

            <h3 className="text-xl font-semibold text-primary-dark mb-1">
              Email Us
            </h3>

            <p className="text-gray-600 text-sm">
              Send detailed requirements and get a structured response.
            </p>

            <Link
              href="mailto:hello@nibletech.com"
              className="mt-2 inline-block text-sm font-semibold text-primary hover:underline"
            >
              Send Email →
            </Link>
          </GlassCard>

          {/* Schedule */}
          <GlassCard className="flex flex-col space-y-8 " hasHoverGlow>
            <div className="w-14 h-14 flex items-center justify-center bg-primary/10 rounded-xl border border-primary/20 mb-3">
              <Calendar size={26} className="text-primary-dark" />
            </div>

            <h3 className="text-xl font-semibold text-primary-dark mb-1">
              Book a Call
            </h3>

            <p className="text-gray-600 text-sm">
              Schedule a meeting at your convenience.
            </p>

            <Link
              href="#schedule"
              className="mt-2 inline-block text-sm font-semibold text-primary hover:underline"
            >
              Schedule →
            </Link>
          </GlassCard>
        </div>
      </div>
    </section>
  );
};

export default ContactMethods;
