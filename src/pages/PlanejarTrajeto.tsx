import { useEffect, useMemo, useState } from "react";
import PageContainer from "../components/layout/PageContainer";
import Reveal from "../components/ui/Reveal";
import Loading from "../components/ui/Loading";
import ErrorMessage from "../components/ui/ErrorMessage";
import TrajetoPointItem from "../components/trajeto/TrajetoPointItem";
import TrajetoSummary from "../components/trajeto/TrajetoSummary";
import { getPontos } from "../services/pontoService";
import type { PontoDescanso } from "../types/ponto";

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

  function mover(id: number, dir: "up" | "down") {
    setSelecionados((atual) => {
      const idx = atual.indexOf(id);
      const alvo = dir === "up" ? idx - 1 : idx + 1;
      if (idx === -1 || alvo < 0 || alvo >= atual.length) return atual;
      const copia = [...atual];
      [copia[idx], copia[alvo]] = [copia[alvo], copia[idx]];
      return copia;
    });
  }

  // mantém a ordem de seleção
  const trajeto = useMemo(
    () =>
      selecionados
        .map((id) => pontos.find((p) => p.cdPonto === id))
        .filter((p): p is PontoDescanso => Boolean(p)),
    [selecionados, pontos]
  );

  return (
    <div className="py-10 sm:py-14">
      <PageContainer>
        <Reveal className="max-w-2xl">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-folego-500">
            Planejar trajeto
          </p>
          <h1 className="mt-3 text-3xl font-extrabold text-folego-700 sm:text-4xl">
            Monte um caminho com as suas paradas.
          </h1>
          <p className="mt-3 text-grafite/80">
            Escolha os pontos de descanso por onde quer passar e veja o resumo do seu percurso.
          </p>
        </Reveal>

        {carregando && <Loading texto="Carregando pontos..." />}
        {!carregando && erro && (
          <div className="mt-8">
            <ErrorMessage texto={erro} />
          </div>
        )}

        {!carregando && !erro && (
          <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
            {/* Seleção */}
            <div>
              <h2 className="mb-4 text-lg font-extrabold text-folego-700">
                Pontos disponíveis
              </h2>
              <div className="space-y-3">
                {pontos.map((p) => (
                  <TrajetoPointItem
                    key={p.cdPonto}
                    ponto={p}
                    selecionado={selecionados.includes(p.cdPonto)}
                    onToggle={alternar}
                  />
                ))}
              </div>
            </div>

            {/* Resumo */}
            <div>
              <TrajetoSummary
                trajeto={trajeto}
                onRemove={(id) => setSelecionados((a) => a.filter((x) => x !== id))}
                onMove={mover}
              />
            </div>
          </div>
        )}
      </PageContainer>
    </div>
  );
}
