import { AlertCircle } from "lucide-react";

export default function ErrorMessage({ texto }: { texto: string }) {
  return (
    <div
      className="flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-rose-700"
      role="alert"
    >
      <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden />
      <span>{texto}</span>
    </div>
  );
}
