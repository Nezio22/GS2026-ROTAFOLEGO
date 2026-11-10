import { Link } from "react-router-dom";
import { Star, MapPin, Umbrella, ArrowRight } from "lucide-react";
import type { PontoDescanso } from "../../types/ponto";
import { tipoInfo } from "../../lib/pontos";
import Badge from "../ui/Badge";

export default function PontoCard({ ponto }: { ponto: PontoDescanso }) {
  const info = tipoInfo[ponto.tipo];

  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-folego-100 bg-white shadow-card transition hover:-translate-y-1 hover:shadow-soft">
      <div className="relative h-40 overflow-hidden bg-areia/40">
        <img
          src={info.imagem}
          alt={`Ilustração representando um ponto do tipo ${info.label.toLowerCase()}`}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3">
          <Badge className="shadow-sm">
            <info.Icon className="h-3.5 w-3.5" aria-hidden />
            {info.label}
          </Badge>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-extrabold text-folego-700">{ponto.nmPonto}</h3>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-grafite/70">
          <MapPin className="h-4 w-4 shrink-0 text-folego-500" aria-hidden />
          {ponto.bairro}
          {ponto.dsEndereco ? ` · ${ponto.dsEndereco}` : ""}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
          {ponto.notaMedia > 0 && (
            <span className="inline-flex items-center gap-1 font-bold text-amber-600">
              <Star className="h-4 w-4 fill-amber-500 text-amber-500" aria-hidden />
              {ponto.notaMedia.toFixed(1)}
            </span>
          )}
          {ponto.coberto && (
            <span className="inline-flex items-center gap-1 text-folego-600">
              <Umbrella className="h-4 w-4" aria-hidden />
              Coberto
            </span>
          )}
        </div>

        <Link
          to={`/ponto/${ponto.cdPonto}`}
          className="mt-5 inline-flex items-center gap-1.5 self-start text-sm font-bold text-folego-600 transition hover:gap-2.5 hover:text-folego-700"
        >
          Ver detalhes
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </article>
  );
}
