import React from "react";
import ContactHero from "./components/ContactHero";
import ContactMethods from "./components/ContactMethods";
import ContactForm from "./components/ContactForm";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Nible Tech for web development, digital marketing, WordPress, AI chatbot integration, and custom IT solutions in Lahore, Pakistan.",
};

export default function Contact() {
  return (
    <main>
      <ContactHero />
      <ContactMethods />
      <ContactForm />
    </main>
  );
}
