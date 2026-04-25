import React from "react";

const WhoWeAre = () => {
  return (
    <section
      id="learn-more"
      className="relative w-full border-l border-r border-t border-gray-200 py-18 md:py-24 overflow-hidden"
    >
      {/* Subtle Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/8 rounded-full blur-[100px] -z-10" />

      <div className=" px-6 flex flex-col items-center text-center relative z-10">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-8 leading-tight">
          Who We{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-dark">
            Are
          </span>
        </h2>

        <div className="border border-gray-200 rounded-2xl px-8 py-10 bg-white/50 backdrop-blur-sm  hover:-translate-y-1 hover:shadow-lg transition-all duration-500 ease-in-out">
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light">
            Nible Technology is a modern development-focused studio dedicated to
            building high-quality digital solutions. We work with startups and
            individuals to transform ideas into scalable, real-world
            applications using modern technologies. Our focus is on clean
            architecture, performance, and delivering solutions that actually
            work in real-world conditions.
          </p>

          <div className="w-20 h-[2px] bg-gradient-to-r from-primary to-primary-dark rounded-full mt-6 mx-auto" />
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
