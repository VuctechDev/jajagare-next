import useFonts from "@/hooks/useFonts";
import Link from "next/link";
import React from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  label: string;
  isSubmitting?: boolean;
  href?: string;
  fullWidth?: boolean;
  fullWidthSmall?: boolean;
  variant?: "primary" | "secondary";
  small?: boolean;
  onClick?: () => void;
}

const variantClasses = {
  primary:
    "bg-[#DB6D1D] hover:brightness-90 text-white font-semibold uppercase",
  secondary:
    "bg-white px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-100 transition",
  disabled: "bg-gray-400 cursor-not-allowed",
};

const Button: React.FC<ButtonProps> = ({
  type = "button",
  label,
  isSubmitting,
  href,
  fullWidth,
  variant = "primary",
  fullWidthSmall,
  small,
  onClick,
}) => {
  const { openSans } = useFonts();
  const widthClass = fullWidthSmall
    ? "w-full md:min-w-[160px] md:max-w-[180px]"
    : fullWidth
      ? "w-full"
      : "min-w-[120px] max-w-[180px]";
  const variantClass = variantClasses[variant];
  const sizeClass = small
    ? "py-0"
    : "py-3 text-[18px] leading-[27px] tracking-[9%]";

  const base = (
    <button
      onClick={onClick}
      type={type}
      disabled={isSubmitting}
      className={`${openSans} px-6 rounded-[40px] ${widthClass} ${sizeClass} shadow-md transition-all duration-300 cursor-pointer ${variantClass}
    ${isSubmitting ? variantClasses.disabled : ""}
  `}
    >
      {isSubmitting ? "Slanje..." : label}
    </button>
  );

  if (!href) {
    return base;
  }
  return (
    <Link href={href} className={`${widthClass} w-fit`}>
      {base}
    </Link>
  );
};

export default Button;
