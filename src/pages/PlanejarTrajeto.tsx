import { useEffect, useMemo, useState, type DragEvent } from "react";
import PageContainer from "../components/layout/PageContainer";
import Reveal from "../components/ui/Reveal";
import Loading from "../components/ui/Loading";
import ErrorMessage from "../components/ui/ErrorMessage";
import TrajetoPointItem from "../components/trajeto/TrajetoPointItem";
import TrajetoSummary from "../components/trajeto/TrajetoSummary";
import { getPontos } from "../services/pontoService";
import type { PontoDescanso } from "../types/ponto";
import Folha from "../components/ui/Folha";

export default function PlanejarTrajeto() {
  const [pontos, setPontos] = useState<PontoDescanso[]>([]);
  const [ordem, setOrdem] = useState<number[]>([]);
  const [selecionados, setSelecionados] = useState<number[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  useEffect(() => {
    getPontos()
      .then((lista) => {
        setPontos(lista);
        setOrdem(lista.map((p) => p.cdPonto));
      })
      .catch(() => setErro("Não foi possível carregar os pontos."))
      .finally(() => setCarregando(false));
  }, []);

  function alternar(id: number) {
    setSelecionados((atual) =>
      atual.includes(id) ? atual.filter((x) => x !== id) : [...atual, id]
    );
  }

  // Lista na ordem atual (reordenável por arrastar)
  const pontosOrdenados = useMemo(
    () =>
      ordem
        .map((id) => pontos.find((p) => p.cdPonto === id))
        .filter((p): p is PontoDescanso => Boolean(p)),
    [ordem, pontos]
  );

  // Trajeto = pontos marcados, respeitando a ordem da lista
  const trajeto = useMemo(
    () => pontosOrdenados.filter((p) => selecionados.includes(p.cdPonto)),
    [pontosOrdenados, selecionados]
  );

  function onDragStart(index: number) {
    setDragIndex(index);
  }
  function onDragOver(e: DragEvent, _index: number) {
    e.preventDefault();
  }
  function onDrop(destino: number) {
    if (dragIndex === null || dragIndex === destino) {
      setDragIndex(null);
      return;
    }
    setOrdem((prev) => {
      const copia = [...prev];
      const [movido] = copia.splice(dragIndex, 1);
      copia.splice(destino, 0, movido);
      return copia;
    });
    setDragIndex(null);
  }

  return (
    <div className="relative overflow-hidden py-10 sm:py-14">
      <Folha
        src="/images/09_Decorativos/galho-vertical.png"
        className="right-0 top-28 hidden w-20 opacity-25 lg:block"
      />
      <PageContainer>
        <Reveal className="max-w-2xl">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-folego-500">
            Planejar trajeto
          </p>
          <h1 className="mt-3 text-3xl font-extrabold text-folego-700 sm:text-4xl">
            Monte um caminho com as suas paradas.
          </h1>
          <p className="mt-3 text-grafite/80">
            Marque os pontos de descanso por onde quer passar, arraste para ordenar e veja o
            resumo do seu percurso.
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
            <div>
              <h2 className="mb-4 text-lg font-extrabold text-folego-700">Pontos disponíveis</h2>
              <div className="space-y-3">
                {pontosOrdenados.map((p, i) => (
                  <TrajetoPointItem
                    key={p.cdPonto}
                    ponto={p}
                    index={i}
                    selecionado={selecionados.includes(p.cdPonto)}
                    onToggle={alternar}
                    onDragStart={onDragStart}
                    onDragOver={onDragOver}
                    onDrop={onDrop}
                    arrastando={dragIndex === i}
                  />
                ))}
              </div>
            </div>

            <div>
              <TrajetoSummary trajeto={trajeto} />
            </div>
          </div>
        )}
      </PageContainer>
    </div>
  );
}
