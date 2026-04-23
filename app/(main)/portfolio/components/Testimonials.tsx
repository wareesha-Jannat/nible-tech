import Image from "next/image";
import GlassCard from "@/app/components/GlassCard";
import { Quote } from "lucide-react";
import { testimonials } from "@/app/utils/dummyData";

const Testimonials = () => {
  return (
    <section className="w-full py-28 px-18 border border-border bg-background flex flex-col">
      {/* Heading */}
      <div className="max-w-2xl mb-14">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
          What Our{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-dark">
            Clients Say
          </span>
        </h2>
        <p className="text-gray-600">
          Honest feedback from people we’ve worked with.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {testimonials.map((t) => (
          <GlassCard
            key={t.id}
            className="p-6 flex flex-col gap-5 hover:-translate-y-1 transition-all"
            hasHoverGlow
          >
            {/* Top Row */}
            <div className="flex items-center gap-4 border-b border-primary-dark pb-4 mb-3">
              <div className="w-14 h-14 relative rounded-full overflow-hidden border">
                <Image
                  src={t.image}
                  alt={t.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <h4 className="font-semibold text-primary-dark">{t.name}</h4>
                <p className="text-sm text-gray-500">{t.role}</p>
              </div>
            </div>

            {/* Quote Icon */}
            <Quote className="text-primary/30" size={24} />

            {/* Message */}
            <p className="text-gray-600 leading-relaxed">{t.message}</p>
          </GlassCard>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
