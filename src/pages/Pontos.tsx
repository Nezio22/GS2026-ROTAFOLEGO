import { useEffect, useMemo, useRef, useState } from "react";
import PageContainer from "../components/layout/PageContainer";
import Reveal from "../components/ui/Reveal";
import Loading from "../components/ui/Loading";
import ErrorMessage from "../components/ui/ErrorMessage";
import EmptyState from "../components/ui/EmptyState";
import Button from "../components/ui/Button";
import PontoCard from "../components/pontos/PontoCard";
import PontoFilters, { type FiltroTipo } from "../components/pontos/PontoFilters";
import PontoForm from "../components/pontos/PontoForm";
import { getPontos } from "../services/pontoService";
import { useFavoritos } from "../hooks/useFavoritos";
import { distanciaCoordsKm } from "../lib/trajeto";
import { Heart, LocateFixed, X } from "lucide-react";
import type { PontoDescanso } from "../types/ponto";

export default function Pontos() {
  const [pontos, setPontos] = useState<PontoDescanso[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const [busca, setBusca] = useState("");
  const [tipo, setTipo] = useState<FiltroTipo>("todos");

  const { favoritos } = useFavoritos();

  const [minhaPos, setMinhaPos] = useState<{ lat: number; lng: number } | null>(null);
  const [geoStatus, setGeoStatus] = useState<"idle" | "carregando" | "erro">("idle");

  const formRef = useRef<HTMLDivElement>(null);

  function localizarMe() {
    if (!("geolocation" in navigator)) {
      setGeoStatus("erro");
      return;
    }
    setGeoStatus("carregando");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setMinhaPos({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setGeoStatus("idle");
      },
      () => setGeoStatus("erro"),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  function limparProximidade() {
    setMinhaPos(null);
    setGeoStatus("idle");
  }

  function distanciaDe(p: PontoDescanso): number | undefined {
    if (!minhaPos || (p.latitude === 0 && p.longitude === 0)) return undefined;
    return distanciaCoordsKm(minhaPos.lat, minhaPos.lng, p.latitude, p.longitude);
  }

  function carregar() {
    setCarregando(true);
    setErro("");
    getPontos()
      .then(setPontos)
      .catch(() => setErro("Não foi possível carregar os pontos. Tente novamente mais tarde."))
      .finally(() => setCarregando(false));
  }

  useEffect(() => {
    carregar();
  }, []);

  const filtrados = useMemo(() => {
    const q = busca.trim().toLowerCase();
    const lista = pontos
      .filter((p) => tipo === "todos" || p.tipo === tipo)
      .filter((p) => {
        if (!q) return true;
        return (
          p.nmPonto.toLowerCase().includes(q) ||
          p.bairro.toLowerCase().includes(q) ||
          p.dsEndereco.toLowerCase().includes(q)
        );
      });

    if (minhaPos) {
      const dist = (p: PontoDescanso) =>
        p.latitude === 0 && p.longitude === 0
          ? Infinity
          : distanciaCoordsKm(minhaPos.lat, minhaPos.lng, p.latitude, p.longitude);
      return lista.sort((a, b) => dist(a) - dist(b));
    }
    return lista.sort((a, b) => a.nmPonto.localeCompare(b.nmPonto));
  }, [pontos, busca, tipo, minhaPos]);

  const salvos = useMemo(
    () => pontos.filter((p) => favoritos.includes(p.cdPonto)),
    [pontos, favoritos]
  );

  function irParaCadastro() {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function limparFiltros() {
    setBusca("");
    setTipo("todos");
  }

  return (
    <div className="py-10 sm:py-14">
      <PageContainer>
        {/* Cabeçalho */}
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-folego-500">
              Pontos de descanso
            </p>
            <h1 className="mt-3 text-3xl font-extrabold text-folego-700 sm:text-4xl">
              Encontre seu próximo ponto de descanso.
            </h1>
            <p className="mt-3 text-grafite/80">
              Explore os locais cadastrados pela comunidade e descubra onde fazer uma pausa.
            </p>
          </div>
          <img
            src="/images/00_Identidade_Visual/emblema.png"
            alt=""
            aria-hidden
            className="hidden h-24 w-auto object-contain opacity-90 md:block"
          />
        </Reveal>

        {/* Meus salvos */}
        {salvos.length > 0 && (
          <section className="mt-10">
            <h2 className="flex items-center gap-2 text-xl font-extrabold text-folego-700">
              <Heart className="h-5 w-5 fill-terracota text-terracota" aria-hidden />
              Meus salvos
              <span className="text-sm font-semibold text-grafite/50">({salvos.length})</span>
            </h2>
            <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {salvos.map((p) => (
                <PontoCard key={p.cdPonto} ponto={p} />
              ))}
            </div>
          </section>
        )}

        {/* Filtros */}
        <div className="mt-10">
          <PontoFilters
            busca={busca}
            onBusca={setBusca}
            tipo={tipo}
            onTipo={setTipo}
            onCadastrar={irParaCadastro}
          />

          {/* Proximidade */}
          <div className="mt-3 flex flex-wrap items-center gap-3">
            {!minhaPos ? (
              <button
                type="button"
                onClick={localizarMe}
                disabled={geoStatus === "carregando"}
                className="inline-flex items-center gap-2 rounded-full border border-folego-100 bg-white px-4 py-2 text-sm font-bold text-folego-700 transition hover:bg-folego-50 disabled:opacity-60"
              >
                <LocateFixed className="h-4 w-4" aria-hidden />
                {geoStatus === "carregando" ? "Localizando..." : "Mais próximos de mim"}
              </button>
            ) : (
              <button
                type="button"
                onClick={limparProximidade}
                className="inline-flex items-center gap-2 rounded-full bg-folego-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-folego-700"
              >
                <LocateFixed className="h-4 w-4" aria-hidden />
                Ordenado por distância
                <X className="h-4 w-4" aria-hidden />
              </button>
            )}
            {geoStatus === "erro" && (
              <span className="text-sm text-terracota">
                Não foi possível obter sua localização. Verifique a permissão do navegador.
              </span>
            )}
          </div>
        </div>

        {/* Lista */}
        <div className="mt-8">
          {carregando && <Loading texto="Carregando pontos..." />}
          {!carregando && erro && <ErrorMessage texto={erro} />}
          {!carregando && !erro && filtrados.length === 0 && (
            <EmptyState
              titulo={pontos.length === 0 ? "Nenhum ponto cadastrado ainda" : "Nenhum resultado"}
              descricao={
                pontos.length === 0
                  ? "Seja a primeira pessoa a cadastrar um ponto de descanso."
                  : "Ajuste a busca ou os filtros para encontrar o que procura."
              }
              acao={
                pontos.length === 0 ? (
                  <Button onClick={irParaCadastro}>Cadastrar ponto</Button>
                ) : (
                  <Button variant="outline" onClick={limparFiltros}>
                    Limpar filtros
                  </Button>
                )
              }
            />
          )}
          {!carregando && !erro && filtrados.length > 0 && (
            <>
              <p className="mb-4 text-sm text-grafite/60">
                {filtrados.length}{" "}
                {filtrados.length === 1 ? "ponto encontrado" : "pontos encontrados"}
              </p>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filtrados.map((p, i) => (
                  <Reveal key={p.cdPonto} delay={(i % 3) * 80}>
                    <PontoCard ponto={p} distanciaKm={distanciaDe(p)} />
                  </Reveal>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Cadastro */}
        <div className="mt-14 scroll-mt-24">
          <PontoForm ref={formRef} onCreated={carregar} />
        </div>
      </PageContainer>
    </div>
  );
}
