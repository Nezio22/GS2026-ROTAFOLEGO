import { Search, Plus, SlidersHorizontal } from "lucide-react";
import type { TipoPonto } from "../../types/ponto";
import { TIPOS, tipoInfo } from "../../lib/pontos";

export type FiltroTipo = TipoPonto | "todos";

interface PontoFiltersProps {
  busca: string;
  onBusca: (v: string) => void;
  tipo: FiltroTipo;
  onTipo: (t: FiltroTipo) => void;
  onCadastrar: () => void;
}

export default function PontoFilters({
  busca,
  onBusca,
  tipo,
  onTipo,
  onCadastrar,
}: PontoFiltersProps) {
  return (
    <div className="flex flex-col gap-3 rounded-3xl border border-folego-100 bg-white p-4 shadow-card md:flex-row md:items-center">
      {/* Busca */}
      <div className="relative flex-1">
        <Search
          className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-folego-500"
          aria-hidden
        />
        <input
          type="search"
          value={busca}
          onChange={(e) => onBusca(e.target.value)}
          placeholder="Buscar por nome, bairro ou endereço..."
          aria-label="Buscar pontos de descanso"
          className="w-full rounded-xl border border-folego-100 bg-offwhite/60 py-2.5 pl-11 pr-3.5 text-sm focus:border-folego-500 focus:outline-none focus:ring-2 focus:ring-folego-500/30"
        />
      </div>

      {/* Filtro por tipo */}
      <div className="relative">
        <SlidersHorizontal
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-folego-500"
          aria-hidden
        />
        <select
          value={tipo}
          onChange={(e) => onTipo(e.target.value as FiltroTipo)}
          aria-label="Filtrar por tipo de ponto"
          className="w-full rounded-xl border border-folego-100 bg-white py-2.5 pl-10 pr-8 text-sm font-medium text-folego-700 focus:border-folego-500 focus:outline-none focus:ring-2 focus:ring-folego-500/30 md:w-auto"
        >
          <option value="todos">Todos os tipos</option>
          {TIPOS.map((t) => (
            <option key={t} value={t}>
              {tipoInfo[t].label}
            </option>
          ))}
        </select>
      </div>

      {/* Cadastrar */}
      <button
        type="button"
        onClick={onCadastrar}
        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-folego-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-folego-700"
      >
        <Plus className="h-4 w-4" aria-hidden />
        Cadastrar novo ponto
      </button>
    </div>
  );
}
