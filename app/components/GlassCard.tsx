import React from "react";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hasHoverGlow?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = "",
  hasHoverGlow = false,
}) => {
  return (
    <div
      className={`group relative flex flex-col p-8 rounded-2xl bg-white border border-gray-200 backdrop-blur-md transition-all duration-500 shadow-md overflow-hidden hover:border-primary/50 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(124,58,237,0.15)] ${className}`}
    >
      {/* Optional internal subtle ambient glow on hover for the card itself */}
      {hasHoverGlow && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10" />
      )}

      {/* Content wrapper with relative z-index so content naturally stays above the glow background if any */}
      <div className="relative z-10 h-full flex flex-col">{children}</div>
    </div>
  );
};

export default GlassCard;
