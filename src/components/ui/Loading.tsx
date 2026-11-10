export default function Loading({ texto = "Carregando..." }: { texto?: string }) {
  return (
    <div
      className="flex items-center justify-center gap-3 py-12 text-folego-700"
      role="status"
      aria-live="polite"
    >
      <span className="h-6 w-6 animate-spin rounded-full border-[3px] border-folego-500/30 border-t-folego-600" />
      <span className="font-medium">{texto}</span>
    </div>
  );
}
