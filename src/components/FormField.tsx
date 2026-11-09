import type { ReactNode } from "react";

interface FormFieldProps {
  label: string;
  htmlFor: string;
  erro?: string;
  children: ReactNode;
}

// Componente reutilizável de campo de formulário (usado em Contato e nas avaliações/cadastro).
export default function FormField({
  label,
  htmlFor,
  erro,
  children,
}: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={htmlFor} className="text-sm font-medium text-slate-700">
        {label}
      </label>
      {children}
      {erro && <span className="text-sm text-rose-600">{erro}</span>}
    </div>
  );
}
