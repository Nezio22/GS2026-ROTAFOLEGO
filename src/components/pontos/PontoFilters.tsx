import { Search, Plus } from "lucide-react";
import type { TipoPonto } from "../../types/ponto";
import { TIPOS, tipoInfo } from "../../lib/pontos";

export type FiltroTipo = TipoPonto | "todos";
export type Ordenacao = "nome" | "nota";

interface PontoFiltersProps {
  busca: string;
  onBusca: (v: string) => void;
  tipo: FiltroTipo;
  onTipo: (t: FiltroTipo) => void;
  ordenacao: Ordenacao;
  onOrdenacao: (o: Ordenacao) => void;
  onCadastrar: () => void;
}

export default function PontoFilters({
  busca,
  onBusca,
  tipo,
  onTipo,
  ordenacao,
  onOrdenacao,
  onCadastrar,
}: PontoFiltersProps) {
  const chips: { valor: FiltroTipo; label: string }[] = [
    { valor: "todos", label: "Todos" },
    ...TIPOS.map((t) => ({ valor: t as FiltroTipo, label: tipoInfo[t].label })),
  ];

  return (
    <div className="rounded-3xl border border-folego-100 bg-white p-4 shadow-card sm:p-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-folego-500"
            aria-hidden
          />
          <input
            type="search"
            value={busca}
            onChange={(e) => onBusca(e.target.value)}
            placeholder="Buscar por nome, bairro ou endereço"
            aria-label="Buscar pontos de descanso"
            className="w-full rounded-xl border border-folego-100 bg-offwhite/60 py-2.5 pl-11 pr-3.5 text-sm focus:border-folego-500 focus:outline-none focus:ring-2 focus:ring-folego-500/30"
          />
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-sm text-grafite/70">
            <span className="hidden sm:inline">Ordenar:</span>
            <select
              value={ordenacao}
              onChange={(e) => onOrdenacao(e.target.value as Ordenacao)}
              aria-label="Ordenar pontos"
              className="rounded-xl border border-folego-100 bg-white px-3 py-2.5 text-sm font-medium focus:border-folego-500 focus:outline-none focus:ring-2 focus:ring-folego-500/30"
            >
              <option value="nome">Nome (A–Z)</option>
              <option value="nota">Melhor avaliados</option>
            </select>
          </label>

          <button
            type="button"
            onClick={onCadastrar}
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-terracota px-4 py-2.5 text-sm font-bold text-white transition hover:bg-terracota-dark"
          >
            <Plus className="h-4 w-4" aria-hidden />
            <span className="hidden sm:inline">Cadastrar ponto</span>
            <span className="sm:hidden">Cadastrar</span>
          </button>
        </div>
      </div>

      {/* Chips de tipo */}
      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filtrar por tipo">
        {chips.map((c) => {
          const ativo = tipo === c.valor;
          return (
            <button
              key={c.valor}
              type="button"
              onClick={() => onTipo(c.valor)}
              aria-pressed={ativo}
              className={`rounded-full px-3.5 py-1.5 text-sm font-bold transition ${
                ativo
                  ? "bg-folego-600 text-white"
                  : "bg-folego-50 text-folego-700 hover:bg-folego-100"
              }`}
            >
              {c.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
