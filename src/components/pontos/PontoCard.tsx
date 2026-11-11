import { Link } from "react-router-dom";
import { Star, MapPin, ArrowRight } from "lucide-react";
import type { PontoDescanso } from "../../types/ponto";
import { tipoInfo } from "../../lib/pontos";
import Badge from "../ui/Badge";

export default function PontoCard({ ponto }: { ponto: PontoDescanso }) {
  const info = tipoInfo[ponto.tipo];

  return (
    <article className="group flex flex-col rounded-3xl border border-folego-100 bg-white p-3 shadow-card transition hover:-translate-y-1 hover:shadow-soft">
      {/* Imagem com leve margem interna */}
      <div className="overflow-hidden rounded-2xl bg-areia/40">
        <img
          src={info.imagem}
          alt={`Ilustração representando um ponto do tipo ${info.label.toLowerCase()}`}
          loading="lazy"
          className="h-40 w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col px-2 pb-1 pt-4">
        {/* Nome + badge */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-extrabold leading-tight text-folego-700">{ponto.nmPonto}</h3>
          <Badge tone="salvia" className="shrink-0">
            {info.label}
          </Badge>
        </div>

        {/* Bairro */}
        <p className="mt-1.5 flex items-center gap-1.5 text-sm text-grafite/70">
          <MapPin className="h-4 w-4 shrink-0 text-folego-500" aria-hidden />
          {ponto.bairro}
        </p>

        {/* Avaliação + ação */}
        <div className="mt-4 flex items-center justify-between">
          {ponto.notaMedia > 0 ? (
            <span className="inline-flex items-center gap-1.5 text-sm">
              <Star className="h-4 w-4 fill-amber-500 text-amber-500" aria-hidden />
              <span className="font-bold text-amber-600">{ponto.notaMedia.toFixed(1)}</span>
              {typeof ponto.qtdAvaliacoes === "number" && ponto.qtdAvaliacoes > 0 && (
                <span className="text-grafite/60">({ponto.qtdAvaliacoes} avaliações)</span>
              )}
            </span>
          ) : (
            <span className="text-sm text-grafite/50">Sem avaliações</span>
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
    </article>
  );
}
