import { X, Wind, Flag } from "lucide-react";
import type { PontoDescanso } from "../../types/ponto";
import { tipoInfo } from "../../lib/pontos";

interface Props {
  trajeto: PontoDescanso[];
  onRemove: (id: number) => void;
}

export default function TrajetoSummary({ trajeto, onRemove }: Props) {
  const paradas = trajeto.length;

  // Avaliação de "fôlego" qualitativa — baseada no nº de paradas.
  // Não inventamos distância nem tempo (não há mapa geográfico real).
  const folego =
    paradas === 0
      ? null
      : paradas >= 3
      ? { texto: "Trajeto confortável, com boas paradas", tom: "text-folego-600" }
      : { texto: "Adicione mais paradas para descansar com calma", tom: "text-terracota" };

  return (
    <div className="sticky top-24 rounded-3xl border border-folego-100 bg-white p-6 shadow-card">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-extrabold text-folego-700">Seu trajeto</h2>
        <span className="rounded-full bg-folego-50 px-3 py-1 text-sm font-bold text-folego-700">
          {paradas} {paradas === 1 ? "parada" : "paradas"}
        </span>
      </div>

      {paradas === 0 ? (
        <div className="mt-5 flex flex-col items-center rounded-2xl bg-areia/30 px-4 py-8 text-center">
          <img
            src="/images/03_Planejar/mapa_resumo_trajeto.png"
            alt=""
            aria-hidden
            loading="lazy"
            className="mb-4 h-32 w-auto object-contain opacity-90"
          />
          <p className="font-bold text-folego-700">Seu trajeto começa com a primeira parada.</p>
          <p className="mt-1 text-sm text-grafite/70">
            Selecione pontos à esquerda para montá-lo.
          </p>
        </div>
      ) : (
        <>
          <ol className="mt-5 space-y-2">
            {trajeto.map((p, i) => {
              const info = tipoInfo[p.tipo];
              return (
                <li
                  key={p.cdPonto}
                  className="flex items-center gap-3 rounded-2xl border border-folego-100 bg-offwhite/50 p-3"
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
            <div className="mt-5 flex items-start gap-2.5 rounded-2xl bg-folego-50 p-4">
              <Wind className={`mt-0.5 h-5 w-5 shrink-0 ${folego.tom}`} aria-hidden />
              <div>
                <p className="text-sm font-bold text-folego-700">Fôlego</p>
                <p className={`text-sm ${folego.tom}`}>{folego.texto}</p>
              </div>
            </div>
          )}

          <p className="mt-4 flex items-center gap-1.5 text-xs text-grafite/50">
            <Flag className="h-3.5 w-3.5" aria-hidden />
            Distância e tempo dependem de um mapa geográfico (ainda não integrado).
          </p>
        </>
      )}
    </div>
  );
}
