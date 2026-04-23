import React from "react";
import GlassCard from "@/app/components/GlassCard";
import { Users, MessageCircle, Coffee, Rocket } from "lucide-react";

const HowWeWork = () => {
  return (
    <section className="relative w-full py-28 px-12 border border-border text-foreground overflow-hidden">
      {/* Background animated blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-gradient-to-tr from-purple-400/20 via-pink-400/20 to-blue-400/20 rounded-full blur-[150px] animate-[blobMove1_15s_ease-in-out_infinite] -z-10" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-gradient-to-tr from-indigo-500/20 via-pink-300/20 to-purple-400/20 rounded-full blur-[150px] animate-[blobMove2_20s_ease-in-out_infinite] -z-10" />

      {/* Container */}
      <div className="w-full max-w-7xl mx-auto flex flex-col items-start">
        {/* Title */}
        <div className="space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold">
            How We{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-dark">
              Work
            </span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl leading-relaxed">
            Our team thrives on collaboration, creativity, and constant
            learning. These principles guide everything we do.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
          {/* Card 1 */}
          <GlassCard
            className="flex flex-row items-start space-x-6 p-6"
            hasHoverGlow
          >
            <div className="w-16 h-16 flex items-center justify-center bg-primary/10 rounded-xl border border-primary/20 group-hover:border-primary/40 group-hover:bg-primary/20 transition-colors duration-500 shrink-0 mb-3">
              <Users size={28} className="text-primary-dark" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-primary-dark mb-2 group-hover:text-primary transition-colors duration-300">
                Collaboration First
              </h3>
              <p className="text-gray-600 font-light text-[15px] leading-relaxed">
                We work together across disciplines to deliver the best
                solutions, valuing each team member’s perspective.
              </p>
            </div>
          </GlassCard>

          {/* Card 2 */}
          <GlassCard
            className="flex flex-row items-start space-x-6 p-6"
            hasHoverGlow
          >
            <div className="w-16 h-16 flex items-center justify-center bg-primary/10 rounded-xl border border-primary/20 group-hover:border-primary/40 group-hover:bg-primary/20 transition-colors duration-500 shrink-0 mb-3">
              <MessageCircle size={28} className="text-primary-dark" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-primary-dark mb-2 group-hover:text-primary transition-colors duration-300">
                Open Communication
              </h3>
              <p className="text-gray-600 font-light text-[15px] leading-relaxed">
                Clear and honest communication keeps our projects on track and
                ensures everyone is aligned with the goals.
              </p>
            </div>
          </GlassCard>

          {/* Card 3 */}
          <GlassCard
            className="flex flex-row items-start space-x-6 p-6"
            hasHoverGlow
          >
            <div className="w-16 h-16 flex items-center justify-center bg-primary/10 rounded-xl border border-primary/20 group-hover:border-primary/40 group-hover:bg-primary/20 transition-colors duration-500 shrink-0 mb-3">
              <Coffee size={28} className="text-primary-dark" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-primary-dark mb-2 group-hover:text-primary transition-colors duration-300">
                Continuous Learning
              </h3>
              <p className="text-gray-600 font-light text-[15px] leading-relaxed">
                We stay curious and embrace new technologies, improving our
                skills and solutions every day.
              </p>
            </div>
          </GlassCard>

          {/* Card 4 */}
          <GlassCard
            className="flex flex-row items-start space-x-6 p-6"
            hasHoverGlow
          >
            <div className="w-16 h-16 flex items-center justify-center bg-primary/10 rounded-xl border border-primary/20 group-hover:border-primary/40 group-hover:bg-primary/20 transition-colors duration-500 shrink-0 mb-3">
              <Rocket size={28} className="text-primary-dark" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-primary-dark mb-2 group-hover:text-primary transition-colors duration-300">
                Deliver With Impact
              </h3>
              <p className="text-gray-600 font-light text-[15px] leading-relaxed">
                Every project we take on is aimed at delivering meaningful
                results for our clients and users.
              </p>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
