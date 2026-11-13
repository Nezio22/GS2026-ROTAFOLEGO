import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";

type Variant = "primary" | "outline" | "terracota" | "ghost";
type Size = "sm" | "md" | "lg";

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  className?: string;
  to?: string; // vira <Link> do react-router
  href?: string; // vira <a> externo
}

type ButtonProps = BaseProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps>;

const variantes: Record<Variant, string> = {
  primary: "bg-folego-600 text-white hover:bg-folego-700 shadow-sm",
  outline: "border-2 border-folego-600 text-folego-700 hover:bg-folego-50",
  terracota: "bg-terracota text-white hover:bg-terracota-dark shadow-sm",
  ghost: "text-folego-700 hover:bg-folego-50",
};

const tamanhos: Record<Size, string> = {
  sm: "px-4 py-2.5 text-sm",
  md: "px-5 py-3 text-sm",
  lg: "px-7 py-3.5 text-base",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  to,
  href,
  ...rest
}: ButtonProps) {
  const classes = [
    "inline-flex items-center justify-center gap-2 rounded-xl font-bold transition",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-folego-500 focus-visible:ring-offset-2",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    variantes[variant],
    tamanhos[size],
    fullWidth ? "w-full" : "",
    className,
  ].join(" ");

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={classes}>
        {children}
      </a>
    );
  }
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
