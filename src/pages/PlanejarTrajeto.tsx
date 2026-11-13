import { useEffect, useMemo, useState, type DragEvent } from "react";
import { ArrowRight } from "lucide-react";
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

  // No celular, rola até o resumo do trajeto (que fica abaixo da lista).
  function verResumo() {
    document
      .getElementById("resumo-trajeto")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
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
    <div className="py-10 sm:py-14">
      <PageContainer>
        <Reveal className="max-w-2xl">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-folego-600">
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
          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
            <div className="min-w-0">
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

            <div className="min-w-0" id="resumo-trajeto">
              <TrajetoSummary trajeto={trajeto} />
            </div>
          </div>
        )}

        {/* Espaço para a lista não ficar escondida atrás da barra fixa (mobile) */}
        {trajeto.length > 0 && <div className="h-24 lg:hidden" aria-hidden />}
      </PageContainer>

      {/* Barra de ação fixa no celular: mostra quantas paradas e leva ao resumo.
          pr-20 reserva espaço para a bolinha de acessibilidade no canto. */}
      {trajeto.length > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-folego-100 bg-white/95 px-4 py-3 pr-20 shadow-[0_-4px_20px_-8px_rgba(15,91,79,0.25)] backdrop-blur-md lg:hidden">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
            <div className="min-w-0 leading-tight">
              <p className="text-base font-extrabold text-folego-700">
                {trajeto.length} {trajeto.length === 1 ? "parada" : "paradas"}
              </p>
              <p className="truncate text-xs text-grafite/70">no seu trajeto</p>
            </div>
            <button
              type="button"
              onClick={verResumo}
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-folego-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-folego-700"
            >
              Ver trajeto
              <ArrowRight className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
