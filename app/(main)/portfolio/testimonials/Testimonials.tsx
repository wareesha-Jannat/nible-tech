import Image from "next/image";
import GlassCard from "@/app/components/GlassCard";
import { Quote } from "lucide-react";
import { TestimonialItem } from "@/lib/types";

const Testimonials = ({
  testimonialsData,
}: {
  testimonialsData: TestimonialItem[];
}) => {
  return (
    <>
      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {testimonialsData.map((t) => (
          <GlassCard
            key={t._id}
            className="p-6 flex flex-col gap-5 hover:-translate-y-1 transition-all"
            hasHoverGlow
          >
            {/* Top Row */}
            <div className="flex items-center gap-4 border-b border-primary-dark pb-4 mb-3">
              <div className="w-14 h-14 relative rounded-full overflow-hidden border">
                <Image
                  src={t.image?.url || "/avatar-placeholder.png"}
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
    </>
  );
};

export default Testimonials;
