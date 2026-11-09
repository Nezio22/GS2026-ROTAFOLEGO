import { useEffect, useState } from "react";
import { getPontos } from "../services/api";
import type { PontoDescanso } from "../types/ponto";
import Card from "../components/Card";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import TipoBadge from "../components/TipoBadge";

export default function PlanejarTrajeto() {
  const [pontos, setPontos] = useState<PontoDescanso[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [selecionados, setSelecionados] = useState<number[]>([]);

  useEffect(() => {
    getPontos()
      .then(setPontos)
      .catch(() => setErro("Não foi possível carregar os pontos."))
      .finally(() => setCarregando(false));
  }, []);

  function alternar(id: number) {
    setSelecionados((atual) =>
      atual.includes(id) ? atual.filter((x) => x !== id) : [...atual, id]
    );
  }

  const trajeto = selecionados
    .map((id) => pontos.find((p) => p.cdPonto === id))
    .filter((p): p is PontoDescanso => Boolean(p));

  const numParadas = trajeto.length;
  // Regra simples de "fôlego": muitas paradas = trajeto mais confortável.
  const folego =
    numParadas === 0
      ? "—"
      : numParadas >= 3
      ? "Confortável (boas paradas)"
      : "Adicione mais paradas para descansar";

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-folego-900">Planejar trajeto</h1>
        <p className="mt-2 text-slate-600">
          Escolha os pontos de descanso por onde quer passar e veja o resumo do seu caminho.
        </p>
      </header>

      {carregando && <Loading texto="Carregando pontos..." />}
      {!carregando && erro && <ErrorMessage texto={erro} />}

      {!carregando && !erro && (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Lista de pontos para selecionar */}
          <div className="space-y-3 lg:col-span-2">
            {pontos.map((p) => {
              const ativo = selecionados.includes(p.cdPonto);
              return (
                <button
                  key={p.cdPonto}
                  type="button"
                  onClick={() => alternar(p.cdPonto)}
                  className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition ${
                    ativo
                      ? "border-folego-500 bg-folego-50"
                      : "border-slate-200 bg-white hover:border-folego-300"
                  }`}
                >
                  <div>
                    <p className="font-medium text-slate-800">{p.nmPonto}</p>
                    <p className="text-sm text-slate-500">{p.bairro}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <TipoBadge tipo={p.tipo} />
                    <span className="text-lg text-folego-600">{ativo ? "✓" : "+"}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Resumo do trajeto */}
          <div>
            <Card className="sticky top-20">
              <h2 className="text-lg font-bold text-folego-900">Resumo do trajeto</h2>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-slate-500">Paradas</dt>
                  <dd className="font-semibold text-slate-800">{numParadas}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-slate-500">Fôlego</dt>
                  <dd className="text-right font-medium text-folego-700">{folego}</dd>
                </div>
              </dl>

              {trajeto.length > 0 && (
                <ol className="mt-5 space-y-2 border-t border-slate-100 pt-4 text-sm">
                  {trajeto.map((p, i) => (
                    <li key={p.cdPonto} className="flex gap-2">
                      <span className="font-semibold text-folego-600">{i + 1}.</span>
                      <span className="text-slate-700">{p.nmPonto}</span>
                    </li>
                  ))}
                </ol>
              )}
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
