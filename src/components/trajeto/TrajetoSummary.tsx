import { PersonStanding, Clock, Pause, Map } from "lucide-react";
import type { PontoDescanso } from "../../types/ponto";
import {
  todosComCoordenadas,
  distanciaTrajetoKm,
  tempoCaminhadaMin,
  googleMapsUrl,
} from "../../lib/trajeto";

export default function TrajetoSummary({ trajeto }: { trajeto: PontoDescanso[] }) {
  const paradas = trajeto.length;
  const temGeo = todosComCoordenadas(trajeto) && paradas >= 2;
  const distanciaKm = temGeo ? distanciaTrajetoKm(trajeto) : 0;
  const tempoMin = temGeo ? tempoCaminhadaMin(distanciaKm) : 0;

  const stats = [
    {
      Icon: PersonStanding,
      label: "Distância estimada (linha reta)",
      valor: temGeo ? `${distanciaKm.toFixed(1).replace(".", ",")} km` : "indisponível",
    },
    {
      Icon: Pause,
      label: "Paradas",
      valor: `${paradas} ${paradas === 1 ? "ponto" : "pontos"}`,
    },
    {
      Icon: Clock,
      label: "Tempo estimado a pé",
      valor: temGeo ? `${tempoMin} min (caminhada leve)` : "indisponível",
    },
  ];

  return (
    <div className="sticky top-24 overflow-hidden rounded-3xl border border-folego-100 bg-white p-6 shadow-card">
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
          <p className="mt-1 text-sm text-grafite/70">Marque pontos à esquerda para montá-lo.</p>
        </div>
      ) : (
        <>
          <dl className="mt-5 space-y-4">
            {stats.map((s) => (
              <div key={s.label} className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-folego-50 text-folego-600">
                  <s.Icon className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <dt className="text-xs text-grafite/60">{s.label}</dt>
                  <dd className="text-lg font-extrabold text-folego-700">{s.valor}</dd>
                </div>
              </div>
            ))}
          </dl>

          {/* Ilustração do trajeto */}
          <div className="mt-5 overflow-hidden rounded-2xl bg-areia/20">
            <img
              src="/images/08_Ilustracoes_Originais_Alta_Resolucao/ilustracao_mapa_pontos.png"
              alt=""
              aria-hidden
              loading="lazy"
              className="h-28 w-full object-cover opacity-90"
            />
          </div>

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
            Distância em linha reta. A rota real pode variar conforme as ruas.
          </p>
        </>
      )}
    </div>
  );
}
