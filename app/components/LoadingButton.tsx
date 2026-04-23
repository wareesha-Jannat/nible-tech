"use client";

import React from "react";
import { Loader2 } from "lucide-react";

type ButtonVariant = "primary" | "danger";
type ButtonType = "button" | "submit" | "reset";

type LoadingButtonProps = {
  children: React.ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  loadingText?: string;
  variant?: ButtonVariant;
  type?: ButtonType;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-primary text-white border-primary hover:opacity-90",
  danger: "border-red-300 text-red-500 hover:bg-red-500 hover:text-white",
};

const LoadingButton = ({
  children,
  isLoading = false,
  disabled = false,
  onClick,
  className = "",
  loadingText = "Loading...",
  variant = "primary",
  type = "button",
}: LoadingButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`
        px-3 py-1 text-xs sm:text-sm border rounded
        transition disabled:opacity-50 disabled:cursor-not-allowed
        flex items-center justify-center gap-2
        min-w-[110px]  /* prevents layout shift */
        ${variantStyles[variant]}
        ${className}
      `}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>{loadingText}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default LoadingButton;
