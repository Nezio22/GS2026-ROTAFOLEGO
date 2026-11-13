import type { ReactNode } from "react";

interface FormFieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
}

export default function FormField({
  label,
  htmlFor,
  error,
  hint,
  required,
  children,
}: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-bold text-folego-700">
        {label}
        {required && <span className="ml-0.5 text-terracota">*</span>}
      </label>
      {children}
      {hint && !error && <span className="text-xs text-grafite/80">{hint}</span>}
      {error && (
        <span className="text-sm font-medium text-rose-600" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

// Classe padrão dos inputs/selects/textarea para reutilizar nas páginas.
export const inputClasses =
  "w-full rounded-xl border border-folego-100 bg-white px-3.5 py-2.5 text-sm text-grafite " +
  "placeholder:text-grafite/40 focus:border-folego-500 focus:outline-none focus:ring-2 focus:ring-folego-500/30";
