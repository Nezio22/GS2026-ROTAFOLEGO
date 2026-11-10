import { Check, Plus } from "lucide-react";
import type { PontoDescanso } from "../../types/ponto";
import { tipoInfo } from "../../lib/pontos";

interface Props {
  ponto: PontoDescanso;
  selecionado: boolean;
  onToggle: (id: number) => void;
}

export default function TrajetoPointItem({ ponto, selecionado, onToggle }: Props) {
  const info = tipoInfo[ponto.tipo];
  return (
    <button
      type="button"
      onClick={() => onToggle(ponto.cdPonto)}
      aria-pressed={selecionado}
      className={`flex w-full items-center gap-4 rounded-2xl border p-3.5 text-left transition ${
        selecionado
          ? "border-folego-500 bg-folego-50 ring-1 ring-folego-500"
          : "border-folego-100 bg-white hover:border-folego-300 hover:bg-folego-50/50"
      }`}
    >
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
          selecionado ? "bg-folego-600 text-white" : "bg-folego-50 text-folego-600"
        }`}
      >
        <info.Icon className="h-5 w-5" aria-hidden />
      </span>

      <span className="min-w-0 flex-1">
        <span className="block truncate font-bold text-folego-700">{ponto.nmPonto}</span>
        <span className="block truncate text-sm text-grafite/70">
          {info.label} · {ponto.bairro}
        </span>
      </span>

      <span
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
          selecionado ? "bg-folego-600 text-white" : "border border-folego-300 text-folego-600"
        }`}
        aria-hidden
      >
        {selecionado ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
      </span>
    </button>
  );
}
