import type { ReactNode } from "react";

interface EmptyStateProps {
  titulo: string;
  descricao?: string;
  imagem?: string;
  icon?: ReactNode;
  acao?: ReactNode;
  className?: string;
}

export default function EmptyState({
  titulo,
  descricao,
  imagem,
  icon,
  acao,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-3xl border border-dashed border-folego-100 bg-white/60 px-6 py-12 text-center ${className}`}
    >
      {imagem ? (
        <img
          src={imagem}
          alt=""
          aria-hidden
          loading="lazy"
          className="mb-4 h-32 w-auto object-contain opacity-90"
        />
      ) : (
        icon && <div className="mb-4 text-folego-500">{icon}</div>
      )}
      <h3 className="text-lg font-extrabold text-folego-700">{titulo}</h3>
      {descricao && <p className="mt-1 max-w-sm text-sm text-grafite/70">{descricao}</p>}
      {acao && <div className="mt-5">{acao}</div>}
    </div>
  );
}
