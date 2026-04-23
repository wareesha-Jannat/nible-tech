import React from "react";
import { faqs } from "@/app/utils/dummyData";
import { ChevronDown } from "lucide-react";

const FAQs = () => {
  return (
    <section className="w-full py-28 px-14 border-l border-r border-t border-gray-200 bg-background text-foreground">
      {/* Container */}
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Title */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold">
            Frequently Asked{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-dark">
              Questions
            </span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl leading-relaxed">
            Everything you need to know about our services and how we work.
          </p>
        </div>

        {/* FAQ List */}
        <div className="w-full space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.id}
              className="group border border-gray-200 rounded-xl p-5 transition-all duration-300 hover:border-primary/40"
            >
              <summary className="flex justify-between items-center cursor-pointer list-none ">
                <span className="font-semibold text-lg text-primary-dark group-hover:text-primary transition-colors">
                  {faq.question}
                </span>

                {/* Custom arrow */}
                <span className="ml-4 transition-transform duration-300 group-open:rotate-180">
                  <ChevronDown />
                </span>
              </summary>

              <p className="mt-4 text-gray-600 leading-relaxed text-[15px] border-t border-border pt-3">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQs;
