import {
  MapPin,
  Route,
  Users,
  ArrowRight,
  Footprints,
  Building2,
  HeartPulse,
  Scale,
} from "lucide-react";
import PageContainer from "../components/layout/PageContainer";
import SectionHeading from "../components/ui/SectionHeading";
import Button from "../components/ui/Button";
import Reveal from "../components/ui/Reveal";

const ajuda = [
  {
    titulo: "Pontos de descanso",
    texto: "Encontre bancos, sombras, bebedouros, marquises e banheiros acessíveis.",
    img: "/images/08_Ilustracoes_Originais_Alta_Resolucao/ilustracao_ponto_completo.png",
    Icon: MapPin,
  },
  {
    titulo: "Trajetos com paradas",
    texto: "Organize seu caminho considerando oportunidades para descansar.",
    img: "/images/08_Ilustracoes_Originais_Alta_Resolucao/ilustracao_mapa_pontos.png",
    Icon: Route,
  },
  {
    titulo: "Feito pela comunidade",
    texto: "Pessoas podem cadastrar e avaliar pontos para ajudar outras pessoas.",
    img: "/images/08_Ilustracoes_Originais_Alta_Resolucao/ilustracao_grupo_acessibilidade.png",
    Icon: Users,
  },
];

const passos = [
  { n: 1, titulo: "Escolha os pontos de descanso", texto: "Veja os locais cadastrados pela comunidade." },
  { n: 2, titulo: "Monte seu trajeto", texto: "Selecione as paradas na ordem do seu caminho." },
  { n: 3, titulo: "Caminhe no seu ritmo", texto: "Siga com tranquilidade, parando quando precisar." },
];

const ods = [
  { n: "11", titulo: "Cidades e comunidades sustentáveis", cor: "#FD9D24", Icon: Building2 },
  { n: "3", titulo: "Saúde e bem-estar", cor: "#4C9F38", Icon: HeartPulse },
  { n: "10", titulo: "Redução das desigualdades", cor: "#DD1367", Icon: Scale },
];

export default function Home() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <img
          src="/images/00_Identidade_Visual/padrao_organico.png"
          alt=""
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 w-[520px] opacity-10"
        />
        <PageContainer className="grid items-center gap-10 py-14 lg:grid-cols-2 lg:py-20">
          <Reveal>
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-folego-500">
              CitizenTech · Global Solution 2026/2
            </p>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight text-folego-700 sm:text-5xl">
              Caminhe no seu ritmo, com um lugar para{" "}
              <span className="text-salvia">descansar</span>.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-grafite/80">
              O Rota do Fôlego ajuda você a encontrar caminhos com pontos de descanso,
              tornando seus trajetos a pé mais confortáveis e acessíveis.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/planejar" size="lg" variant="terracota">
                Planejar um trajeto
              </Button>
              <Button to="/pontos" size="lg" variant="outline">
                Ver pontos de descanso
              </Button>
            </div>
          </Reveal>

          <Reveal delay={120} className="relative">
            <div className="absolute inset-0 -rotate-2 rounded-[2rem] bg-salvia/20" aria-hidden />
            <img
              src="/images/01_Home/hero_casal_caminhada.png"
              alt="Pessoas caminhando com tranquilidade por um parque arborizado"
              className="relative w-full rounded-[2rem] object-cover shadow-soft"
            />
            <div className="absolute -bottom-5 left-5 flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-soft">
              <Footprints className="h-5 w-5 text-folego-600" aria-hidden />
              <span className="text-sm font-bold text-folego-700">Descanso no caminho</span>
            </div>
          </Reveal>
        </PageContainer>
      </section>

      {/* COMO AJUDAMOS */}
      <section className="py-16">
        <PageContainer>
          <Reveal>
            <SectionHeading
              eyebrow="Como ajudamos"
              title="Tudo pensado para o seu conforto"
              subtitle="Três formas de tornar a caminhada mais leve para quem precisa de pausas."
            />
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {ajuda.map((a, i) => (
              <Reveal key={a.titulo} delay={i * 100}>
                <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-folego-100 bg-white shadow-card transition hover:-translate-y-1 hover:shadow-soft">
                  <div className="h-40 overflow-hidden bg-areia/40">
                    <img
                      src={a.img}
                      alt=""
                      aria-hidden
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-folego-50 text-folego-600">
                      <a.Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <h3 className="mt-4 text-lg font-extrabold text-folego-700">{a.titulo}</h3>
                    <p className="mt-2 text-sm text-grafite/70">{a.texto}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </PageContainer>
      </section>

      {/* COMO FUNCIONA */}
      <section className="bg-white py-16">
        <PageContainer>
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow="Como funciona"
              title="Três passos até um caminho mais tranquilo"
              className="mx-auto"
            />
          </Reveal>
          <div className="relative mt-12 grid gap-8 md:grid-cols-3">
            <div
              className="absolute left-0 right-0 top-7 hidden border-t-2 border-dashed border-salvia/50 md:block"
              aria-hidden
            />
            {passos.map((p, i) => (
              <Reveal key={p.n} delay={i * 120} className="relative text-center">
                <div className="relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-folego-600 text-xl font-extrabold text-white shadow-soft">
                  {p.n}
                </div>
                <h3 className="mt-5 text-lg font-extrabold text-folego-700">{p.titulo}</h3>
                <p className="mx-auto mt-2 max-w-xs text-sm text-grafite/70">{p.texto}</p>
              </Reveal>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button to="/planejar" variant="primary">
              Começar a planejar
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
          </div>
        </PageContainer>
      </section>

      {/* IMPACTO / ODS */}
      <section className="py-16">
        <PageContainer>
          <Reveal className="overflow-hidden rounded-[2rem] border border-folego-100 bg-folego-700 text-white shadow-soft">
            <div className="grid items-center gap-8 md:grid-cols-2">
              <div className="p-8 sm:p-12">
                <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-salvia">
                  Impacto social
                </p>
                <h2 className="mt-3 text-3xl font-extrabold">
                  Tecnologia a serviço de cidades mais acessíveis
                </h2>
                <p className="mt-4 text-white/80">
                  O Rota do Fôlego se conecta aos Objetivos de Desenvolvimento Sustentável
                  da ONU, colocando o cidadão no centro da inovação.
                </p>
                <div className="mt-6 grid grid-cols-3 gap-3">
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
                </div>
              </div>
              <div className="h-full min-h-[240px]">
                <img
                  src="/images/01_Home/paisagem_ods.png"
                  alt="Ilustração de uma cidade sustentável com praças e áreas verdes"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </Reveal>
        </PageContainer>
      </section>
    </div>
  );
}
