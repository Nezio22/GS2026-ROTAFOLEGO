import { useState, type DragEvent } from "react";
import { Link } from "react-router-dom";
import { GripVertical, ChevronDown, MapPin, Star, ArrowRight } from "lucide-react";
import type { PontoDescanso } from "../../types/ponto";
import { tipoInfo } from "../../lib/pontos";
import Badge from "../ui/Badge";

interface Props {
  ponto: PontoDescanso;
  selecionado: boolean;
  onToggle: (id: number) => void;
  index: number;
  onDragStart: (index: number) => void;
  onDragOver: (e: DragEvent, index: number) => void;
  onDrop: (index: number) => void;
  arrastando: boolean;
}

export default function TrajetoPointItem({
  ponto,
  selecionado,
  onToggle,
  index,
  onDragStart,
  onDragOver,
  onDrop,
  arrastando,
}: Props) {
  const info = tipoInfo[ponto.tipo] ?? tipoInfo.banco;
  // Cada card controla se está expandido (mostrando os detalhes) ou não.
  const [aberto, setAberto] = useState(false);
  const idDetalhes = `trajeto-detalhes-${ponto.cdPonto}`;

  return (
    <div
      draggable
      onDragStart={() => onDragStart(index)}
      onDragOver={(e) => onDragOver(e, index)}
      onDrop={() => onDrop(index)}
      className={`overflow-hidden rounded-2xl border bg-white transition ${
        selecionado ? "border-folego-300 bg-folego-50/40" : "border-folego-100"
      } ${arrastando ? "opacity-40" : ""}`}
    >
      {/* Linha principal: o botão (ícone + nome) abre os detalhes;
          o checkbox, separado, só marca/desmarca para a rota. */}
      <div className="flex items-center gap-3 p-3">
        <span
          className="hidden shrink-0 cursor-grab text-grafite/30 active:cursor-grabbing sm:inline-flex"
          title="Arraste para reordenar"
          aria-hidden
        >
          <GripVertical className="h-5 w-5" />
        </span>

        <button
          type="button"
          onClick={() => setAberto((v) => !v)}
          aria-expanded={aberto}
          aria-controls={idDetalhes}
          className="flex min-w-0 flex-1 items-center gap-3 text-left"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-areia/60 text-folego-700">
            <info.Icon className="h-5 w-5" aria-hidden />
          </span>

          <span className="min-w-0 flex-1">
            <span className="block truncate font-bold text-folego-700">{ponto.nmPonto}</span>
            <span className="block truncate text-sm text-grafite/80">{ponto.bairro}</span>
          </span>

          <ChevronDown
            className={`h-5 w-5 shrink-0 text-grafite/40 transition-transform duration-300 motion-reduce:transition-none ${
              aberto ? "rotate-180" : ""
            }`}
            aria-hidden
          />
        </button>

        <input
          type="checkbox"
          checked={selecionado}
          onChange={() => onToggle(ponto.cdPonto)}
          aria-label={`Incluir ${ponto.nmPonto} no trajeto`}
          className="h-6 w-6 shrink-0 rounded border-folego-300 text-folego-600 focus:ring-folego-500"
        />
      </div>

      {/* Painel de detalhes (sanfona). O truque grid-rows 0fr→1fr anima a
          altura até o conteúdo de forma suave, sem altura fixa. */}
      <div
        id={idDetalhes}
        className={`grid transition-all duration-300 ease-out motion-reduce:transition-none ${
          aberto ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-folego-100 p-3">
            <div className="overflow-hidden rounded-xl bg-areia/30">
              <img
                src={info.imagem}
                alt={`Ilustração representando um ponto do tipo ${info.label.toLowerCase()}`}
                loading="lazy"
                className="h-28 w-full object-cover opacity-90"
              />
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Badge tone="salvia">{info.label}</Badge>
              <Badge tone={ponto.coberto ? "verde" : "neutro"}>
                {ponto.coberto ? "Coberto" : "Sem cobertura"}
              </Badge>
            </div>

            <p className="mt-3 flex items-start gap-1.5 text-sm text-grafite/70">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-folego-500" aria-hidden />
              <span className="min-w-0">{ponto.dsEndereco || ponto.bairro}</span>
            </p>

            <div className="mt-4 flex items-center justify-between gap-2">
              {ponto.notaMedia > 0 ? (
                <span className="inline-flex items-center gap-1.5 text-sm">
                  <Star className="h-4 w-4 fill-amber-500 text-amber-500" aria-hidden />
                  <span className="font-bold text-amber-600">{ponto.notaMedia.toFixed(1)}</span>
                  {typeof ponto.qtdAvaliacoes === "number" && ponto.qtdAvaliacoes > 0 && (
                    <span className="text-grafite/80">({ponto.qtdAvaliacoes} avaliações)</span>
                  )}
                </span>
              ) : (
                <span className="text-sm text-grafite/80">Sem avaliações</span>
              )}

              <Link
                to={`/ponto/${ponto.cdPonto}`}
                aria-label={`Saiba mais sobre ${ponto.nmPonto}`}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-folego-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-folego-700"
              >
                Saiba mais
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
