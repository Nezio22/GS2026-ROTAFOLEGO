import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const alinhar = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={`max-w-2xl ${alinhar} ${className}`}>
      {eyebrow && (
        <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.18em] text-folego-600">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-extrabold text-folego-700 sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-base text-grafite/80">{subtitle}</p>}
    </div>
  );
}
