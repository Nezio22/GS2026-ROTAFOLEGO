import type { ReactNode } from "react";

type Tone = "verde" | "salvia" | "areia" | "terracota" | "neutro";

interface BadgeProps {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}

const tons: Record<Tone, string> = {
  verde: "bg-folego-100 text-folego-700",
  salvia: "bg-[#e3efe0] text-[#3f6b3a]",
  areia: "bg-[#f1e6cf] text-[#8a6d2f]",
  terracota: "bg-[#f3e0d6] text-[#a4552f]",
  neutro: "bg-slate-100 text-slate-600",
};

export default function Badge({ children, tone = "verde", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${tons[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
