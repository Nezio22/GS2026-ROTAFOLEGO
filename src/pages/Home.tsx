import { Building2, HeartPulse, Scale } from "lucide-react";
import PageContainer from "../components/layout/PageContainer";
import Button from "../components/ui/Button";
import Reveal from "../components/ui/Reveal";

const ajuda = [
  {
    titulo: "Pontos de descanso",
    texto: "Bancos, sombra, marquises, bebedouros e banheiros acessíveis.",
    img: "/images/01_Home/card_banco_descanso.png",
  },
  {
    titulo: "Trajeto com paradas",
    texto: "Monte um caminho equilibrado, com locais seguros para descansar.",
    img: "/images/01_Home/card_mapa_rota.png",
  },
  {
    titulo: "Feito pela comunidade",
    texto: "Qualquer pessoa pode cadastrar e avaliar pontos, ajudando a cidade.",
    img: "/images/01_Home/card_comunidade.png",
  },
];

const ods = [
  { n: "11", titulo: "Cidades e comunidades sustentáveis", cor: "#FD9D24", Icon: Building2 },
  { n: "3", titulo: "Saúde e bem-estar", cor: "#4C9F38", Icon: HeartPulse },
  { n: "10", titulo: "Redução das desigualdades", cor: "#DD1367", Icon: Scale },
];

export default function Home() {
  return (
    <div>
      {/* HERO — texto primeiro no celular; imagem full-bleed à direita no desktop */}
      <section className="relative overflow-hidden">
        <img
          src="/images/00_Identidade_Visual/padrao_organico.png"
          alt=""
          aria-hidden
          className="pointer-events-none absolute -left-16 -top-10 hidden w-72 opacity-10 lg:block"
        />

        <PageContainer className="relative py-10 lg:py-24">
          <Reveal className="lg:max-w-[52%]">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-folego-500">
              CitizenTech · Global Solution 2026/2
            </p>
            <h1 className="mt-4 text-3xl font-extrabold leading-tight text-folego-700 sm:text-4xl lg:text-5xl">
              Caminhe no seu ritmo, com um lugar para{" "}
              <span className="text-salvia">descansar</span>.
            </h1>
            <p className="mt-5 max-w-xl text-base text-grafite/80 sm:text-lg">
              O Rota do Fôlego planeja o seu trajeto a pé priorizando pontos de descanso.
              Pensado para idosos, gestantes e pessoas com mobilidade reduzida.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button to="/planejar" size="lg">
                Planejar um trajeto
              </Button>
              <Button to="/pontos" size="lg" variant="outline">
                Ver pontos de descanso
              </Button>
            </div>
          </Reveal>
        </PageContainer>

        {/* Imagem: bloco após o texto no celular, absoluta à direita no desktop */}
        <div className="px-4 pb-10 lg:absolute lg:inset-y-0 lg:right-0 lg:w-[48%] lg:px-0 lg:pb-0">
          <img
            src="/images/08_Ilustracoes_Originais_Alta_Resolucao/ilustracao_acessibilidade_parque.png"
            alt="Idoso, gestante, cadeirante e idosa caminhando por um parque, com um celular mostrando a rota de pontos de descanso"
            className="h-56 w-full rounded-3xl object-cover sm:h-72 lg:h-full lg:rounded-none"
          />
          <div
            className="absolute inset-y-0 left-0 hidden w-40 bg-gradient-to-r from-offwhite to-transparent lg:block"
            aria-hidden
          />
        </div>
      </section>

      {/* Divisor decorativo: linha de rota com ponto de parada */}
      <div aria-hidden className="mx-auto w-full max-w-4xl px-6 pt-10 opacity-70">
        <img
          src="/images/09_Decorativos/divisor-rota.png"
          alt=""
          loading="lazy"
          draggable={false}
          className="h-auto w-full select-none"
        />
      </div>

      {/* 3 CARDS horizontais */}
      <section className="py-14">
        <PageContainer>
          <div className="grid gap-6 md:grid-cols-3">
            {ajuda.map((a, i) => (
              <Reveal key={a.titulo} delay={i * 100}>
                <div className="flex h-full items-center gap-4 rounded-3xl border border-folego-100 bg-white p-4 shadow-card transition hover:-translate-y-1 hover:shadow-soft">
                  <img
                    src={a.img}
                    alt=""
                    aria-hidden
                    loading="lazy"
                    className="h-20 w-20 shrink-0 rounded-2xl object-cover"
                  />
                  <div>
                    <h3 className="font-extrabold text-folego-700">{a.titulo}</h3>
                    <p className="mt-1 text-sm text-grafite/70">{a.texto}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </PageContainer>
      </section>

      {/* FAIXA ODS (full-bleed) */}
      <section className="relative overflow-hidden bg-folego-700 text-white">
        <img
          src="/images/00_Identidade_Visual/padrao_organico.png"
          alt=""
          aria-hidden
          className="pointer-events-none absolute -left-10 bottom-0 w-64 opacity-10"
        />
        <PageContainer className="relative grid items-center gap-8 py-12 md:grid-cols-[1fr_1.5fr] lg:py-16">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-salvia">
              Impacto
            </p>
            <h2 className="mt-1 text-4xl font-extrabold leading-none sm:text-5xl">ODS da ONU</h2>
            <p className="mt-4 max-w-sm text-sm text-white/80">
              Tecnologia com o cidadão no centro, conectada à Agenda 2030.
            </p>
          </Reveal>
          <Reveal delay={120} className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {ods.map((o) => (
              <div
                key={o.n}
                className="rounded-2xl p-4 text-white shadow-sm"
                style={{ backgroundColor: o.cor }}
              >
                <o.Icon className="h-6 w-6" aria-hidden />
                <p className="mt-2 text-2xl font-extrabold leading-none">{o.n}</p>
                <p className="mt-1.5 text-xs font-semibold leading-tight">{o.titulo}</p>
              </div>
            ))}
          </Reveal>
        </PageContainer>
      </section>
    </div>
  );
}
