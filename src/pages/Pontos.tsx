import { useEffect, useMemo, useRef, useState } from "react";
import PageContainer from "../components/layout/PageContainer";
import Reveal from "../components/ui/Reveal";
import Loading from "../components/ui/Loading";
import ErrorMessage from "../components/ui/ErrorMessage";
import EmptyState from "../components/ui/EmptyState";
import Button from "../components/ui/Button";
import PontoCard from "../components/pontos/PontoCard";
import PontoFilters, {
  type FiltroTipo,
  type Ordenacao,
} from "../components/pontos/PontoFilters";
import PontoForm from "../components/pontos/PontoForm";
import { getPontos } from "../services/pontoService";
import type { PontoDescanso } from "../types/ponto";

export default function Pontos() {
  const [pontos, setPontos] = useState<PontoDescanso[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const [busca, setBusca] = useState("");
  const [tipo, setTipo] = useState<FiltroTipo>("todos");
  const [ordenacao, setOrdenacao] = useState<Ordenacao>("nome");

  const formRef = useRef<HTMLDivElement>(null);

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
    return pontos
      .filter((p) => tipo === "todos" || p.tipo === tipo)
      .filter((p) => {
        if (!q) return true;
        return (
          p.nmPonto.toLowerCase().includes(q) ||
          p.bairro.toLowerCase().includes(q) ||
          p.dsEndereco.toLowerCase().includes(q)
        );
      })
      .sort((a, b) =>
        ordenacao === "nota" ? b.notaMedia - a.notaMedia : a.nmPonto.localeCompare(b.nmPonto)
      );
  }, [pontos, busca, tipo, ordenacao]);

  function irParaCadastro() {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
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

        {/* Filtros */}
        <div className="mt-8">
          <PontoFilters
            busca={busca}
            onBusca={setBusca}
            tipo={tipo}
            onTipo={setTipo}
            ordenacao={ordenacao}
            onOrdenacao={setOrdenacao}
            onCadastrar={irParaCadastro}
          />
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
              acao={<Button onClick={irParaCadastro}>Cadastrar ponto</Button>}
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
                    <PontoCard ponto={p} />
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
