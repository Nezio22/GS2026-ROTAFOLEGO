// Componente de estado de carregamento (usado na integração com a API).
export default function Loading({ texto = "Carregando..." }: { texto?: string }) {
  return (
    <div className="flex items-center gap-3 py-10 text-slate-500">
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-folego-500 border-t-transparent" />
      <span>{texto}</span>
    </div>
  );
}
