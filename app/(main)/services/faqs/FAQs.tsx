import React from "react";
import { ChevronDown } from "lucide-react";
import { FaqItem } from "@/lib/types";

const FAQs = ({ faqsData }: { faqsData: FaqItem[] }) => {
  return (
    <>
      {/* FAQ List */}
      <div className="w-full space-y-4">
        {faqsData.map((faq) => (
          <details
            key={faq._id}
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
    </>
  );
};

export default FAQs;
