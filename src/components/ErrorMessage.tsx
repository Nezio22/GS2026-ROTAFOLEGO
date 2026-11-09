// Componente de estado de erro (usado na integração com a API).
export default function ErrorMessage({ texto }: { texto: string }) {
  return (
    <div className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-rose-700">
      {texto}
    </div>
  );
}
