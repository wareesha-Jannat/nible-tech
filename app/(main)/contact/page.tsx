import React from "react";
import ContactHero from "./components/ContactHero";
import ContactMethods from "./components/ContactMethods";
import ContactForm from "./components/ContactForm";

const page = () => {
  return (
    <>
      <ContactHero />
      <ContactMethods />
      <ContactForm />
    </>
  );
};

export default page;
