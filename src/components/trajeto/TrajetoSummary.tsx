import { X, Wind, PersonStanding, Clock, Pause, ChevronUp, ChevronDown, Map } from "lucide-react";
import type { PontoDescanso } from "../../types/ponto";
import { tipoInfo } from "../../lib/pontos";
import {
  todosComCoordenadas,
  distanciaTrajetoKm,
  tempoCaminhadaMin,
  googleMapsUrl,
} from "../../lib/trajeto";

interface Props {
  trajeto: PontoDescanso[];
  onRemove: (id: number) => void;
  onMove: (id: number, dir: "up" | "down") => void;
}

export default function TrajetoSummary({ trajeto, onRemove, onMove }: Props) {
  const paradas = trajeto.length;
  const temGeo = todosComCoordenadas(trajeto) && paradas >= 2;
  const distanciaKm = temGeo ? distanciaTrajetoKm(trajeto) : 0;
  const tempoMin = temGeo ? tempoCaminhadaMin(distanciaKm) : 0;

  const folego =
    paradas === 0
      ? null
      : paradas >= 3
      ? "Trajeto confortável, com boas paradas"
      : "Adicione mais paradas para descansar com calma";

  return (
    <div className="sticky top-24 rounded-3xl border border-folego-100 bg-white p-6 shadow-card">
      <h2 className="text-xl font-extrabold text-folego-700">Resumo do trajeto</h2>

      {paradas === 0 ? (
        <div className="mt-5 flex flex-col items-center rounded-2xl bg-areia/30 px-4 py-8 text-center">
          <img
            src="/images/08_Ilustracoes_Originais_Alta_Resolucao/ilustracao_mapa_pontos.png"
            alt=""
            aria-hidden
            loading="lazy"
            className="mb-4 h-32 w-auto object-contain opacity-90"
          />
          <p className="font-bold text-folego-700">Seu trajeto começa com a primeira parada.</p>
          <p className="mt-1 text-sm text-grafite/70">Selecione pontos à esquerda para montá-lo.</p>
        </div>
      ) : (
        <>
          {/* Estatísticas */}
          <dl className="mt-5 space-y-3">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-folego-50 text-folego-600">
                <PersonStanding className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <dt className="text-xs text-grafite/60">Distância estimada (linha reta)</dt>
                <dd className="font-extrabold text-folego-700">
                  {temGeo ? `${distanciaKm.toFixed(1).replace(".", ",")} km` : "—"}
                </dd>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-folego-50 text-folego-600">
                <Pause className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <dt className="text-xs text-grafite/60">Paradas</dt>
                <dd className="font-extrabold text-folego-700">
                  {paradas} {paradas === 1 ? "ponto" : "pontos"}
                </dd>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-folego-50 text-folego-600">
                <Clock className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <dt className="text-xs text-grafite/60">Tempo estimado a pé</dt>
                <dd className="font-extrabold text-folego-700">
                  {temGeo ? `${tempoMin} min (caminhada leve)` : "—"}
                </dd>
              </div>
            </div>
          </dl>

          {/* Lista ordenável */}
          <ol className="mt-5 space-y-2 border-t border-folego-100 pt-4">
            {trajeto.map((p, i) => {
              const info = tipoInfo[p.tipo];
              return (
                <li
                  key={p.cdPonto}
                  className="flex items-center gap-2 rounded-2xl border border-folego-100 bg-offwhite/50 p-2.5"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-folego-600 text-xs font-extrabold text-white">
                    {i + 1}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-bold text-folego-700">
                      {p.nmPonto}
                    </span>
                    <span className="block truncate text-xs text-grafite/60">
                      {info.label} · {p.bairro}
                    </span>
                  </span>
                  <span className="flex flex-col">
                    <button
                      type="button"
                      onClick={() => onMove(p.cdPonto, "up")}
                      disabled={i === 0}
                      aria-label={`Mover ${p.nmPonto} para cima`}
                      className="rounded p-0.5 text-grafite/50 transition hover:text-folego-600 disabled:opacity-25"
                    >
                      <ChevronUp className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onMove(p.cdPonto, "down")}
                      disabled={i === trajeto.length - 1}
                      aria-label={`Mover ${p.nmPonto} para baixo`}
                      className="rounded p-0.5 text-grafite/50 transition hover:text-folego-600 disabled:opacity-25"
                    >
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </span>
                  <button
                    type="button"
                    onClick={() => onRemove(p.cdPonto)}
                    aria-label={`Remover ${p.nmPonto} do trajeto`}
                    className="rounded-lg p-1.5 text-grafite/50 transition hover:bg-rose-50 hover:text-rose-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </li>
              );
            })}
          </ol>

          {folego && (
            <div className="mt-4 flex items-start gap-2.5 rounded-2xl bg-folego-50 p-3.5">
              <Wind className="mt-0.5 h-5 w-5 shrink-0 text-folego-600" aria-hidden />
              <p className="text-sm text-folego-700">{folego}</p>
            </div>
          )}

          {/* Gerar trajeto */}
          {temGeo ? (
            <a
              href={googleMapsUrl(trajeto)}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-folego-600 px-5 py-3 font-bold text-white transition hover:bg-folego-700"
            >
              <Map className="h-5 w-5" aria-hidden />
              Gerar trajeto no Google Maps
            </a>
          ) : (
            <p className="mt-5 rounded-xl bg-areia/30 px-4 py-3 text-center text-xs text-grafite/60">
              Selecione ao menos 2 pontos com localização para gerar a rota.
            </p>
          )}

          <p className="mt-3 text-center text-[11px] text-grafite/50">
            Distância em linha reta — a rota real pode variar conforme as ruas.
          </p>
        </>
      )}
    </div>
  );
}
