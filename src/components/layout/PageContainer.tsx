import type { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  /** largura máxima do conteúdo */
  size?: "default" | "narrow" | "wide";
}

const larguras = {
  narrow: "max-w-3xl",
  default: "max-w-6xl",
  wide: "max-w-7xl",
};

export default function PageContainer({
  children,
  className = "",
  size = "default",
}: PageContainerProps) {
  return <div className={`mx-auto w-full ${larguras[size]} px-4 ${className}`}>{children}</div>;
}
