import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "outline";
}

// Componente reutilizável de botão (usado em vários formulários e páginas).
export default function Button({
  children,
  variant = "primary",
  className = "",
  ...rest
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-folego-500 disabled:opacity-50 disabled:cursor-not-allowed";
  const estilos =
    variant === "primary"
      ? "bg-folego-600 text-white hover:bg-folego-700"
      : "border border-folego-600 text-folego-700 hover:bg-folego-50";
  return (
    <button className={`${base} ${estilos} ${className}`} {...rest}>
      {children}
    </button>
  );
}
