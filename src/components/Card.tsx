import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

// Componente reutilizável de cartão (usado na Home, na lista de pontos e em Integrantes).
export default function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md ${className}`}
    >
      {children}
    </div>
  );
}
