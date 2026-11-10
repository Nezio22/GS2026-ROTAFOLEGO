import {
  HeartHandshake,
  Accessibility,
  Baby,
  PersonStanding,
  HeartPulse,
  MapPinned,
  Route,
  Star,
  Ruler,
} from "lucide-react";
import PageContainer from "../components/layout/PageContainer";
import SectionHeading from "../components/ui/SectionHeading";
import Reveal from "../components/ui/Reveal";

const publico = [
  { Icon: PersonStanding, titulo: "Pessoas idosas", texto: "Que se cansam mais rápido e precisam de pausas." },
  { Icon: Baby, titulo: "Gestantes", texto: "Que precisam de conforto e segurança no caminho." },
  { Icon: Accessibility, titulo: "Mobilidade reduzida", texto: "Que dependem de rotas acessíveis e locais de apoio." },
  { Icon: HeartPulse, titulo: "Condições de saúde", texto: "Que exigem pausas frequentes durante a caminhada." },
];

const indicadores = [
  { Icon: MapPinned, titulo: "Pontos cadastrados", texto: "Quantos locais de descanso a comunidade mapeou." },
  { Icon: Route, titulo: "Trajetos planejados", texto: "Quantos caminhos foram montados no app." },
  { Icon: Star, titulo: "Avaliações dos pontos", texto: "A qualidade percebida de cada local." },
  { Icon: Ruler, titulo: "Distância entre paradas", texto: "O conforto do percurso ao longo do tempo." },
];

const ods = [
  { n: "3", titulo: "Saúde e bem-estar", texto: "Incentiva a caminhada segura e confortável." },
  { n: "10", titulo: "Redução das desigualdades", texto: "Dá autonomia a quem tem mais dificuldade de locomoção." },
  { n: "11", titulo: "Cidades e comunidades sustentáveis", texto: "Torna o espaço urbano mais acolhedor para todos." },
];

export default function Sobre() {
  return (
    <div>
      {/* HERO */}
      <section className="py-14 lg:py-20">
        <PageContainer className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-folego-500">
              Sobre o projeto
            </p>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight text-folego-700 sm:text-5xl">
              Uma cidade melhor começa com caminhos mais acessíveis.
            </h1>
            <p className="mt-5 text-lg text-grafite/80">
              O Rota do Fôlego nasceu de uma observação simples: andar a pé pela cidade é
              cansativo para muita gente, e faltam lugares sinalizados para descansar. Nossa
              proposta é colocar o descanso no centro do planejamento do trajeto.
            </p>
          </Reveal>
          <Reveal delay={120} className="relative">
            <div className="absolute inset-0 rotate-2 rounded-[2rem] bg-areia/40" aria-hidden />
            <img
              src="/images/04_Sobre/idoso_descansando_banco.png"
              alt="Pessoa idosa descansando tranquilamente em um banco de praça"
              className="relative w-full rounded-[2rem] object-cover shadow-soft"
            />
          </Reveal>
        </PageContainer>
      </section>

      {/* PROBLEMA + SOLUÇÃO */}
      <section className="bg-white py-16">
        <PageContainer className="grid gap-12 md:grid-cols-2">
          <Reveal>
            <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-terracota">
              O problema
            </span>
            <h2 className="mt-3 text-2xl font-extrabold text-folego-700">
              Mapas comuns pensam em distância, não em descanso
            </h2>
            <p className="mt-4 text-grafite/80">
              Idosos, gestantes, pessoas com mobilidade reduzida e pessoas com condições de
              saúde precisam parar durante o trajeto. Os aplicativos de rota otimizam o menor
              caminho e o menor tempo — mas escondem onde há um banco, uma sombra ou um
              banheiro acessível.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-folego-500">
              A solução
            </span>
            <h2 className="mt-3 text-2xl font-extrabold text-folego-700">
              Caminhos planejados em torno das pausas
            </h2>
            <p className="mt-4 text-grafite/80">
              Reunimos pontos de descanso mapeados pela própria comunidade e deixamos a pessoa
              montar o trajeto escolhendo onde parar. Quem conhece a cidade ajuda quem precisa
              dela — cadastrando e avaliando locais de apoio.
            </p>
          </Reveal>
        </PageContainer>
      </section>

      {/* PARA QUEM */}
      <section className="py-16">
        <PageContainer>
          <Reveal>
            <SectionHeading
              eyebrow="Para quem criamos"
              title="Tecnologia centrada em quem precisa de uma pausa"
            />
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {publico.map((p, i) => (
              <Reveal key={p.titulo} delay={i * 90}>
                <div className="flex h-full flex-col rounded-3xl border border-folego-100 bg-white p-6 shadow-card">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-folego-50 text-folego-600">
                    <p.Icon className="h-6 w-6" aria-hidden />
                  </span>
                  <h3 className="mt-4 font-extrabold text-folego-700">{p.titulo}</h3>
                  <p className="mt-2 text-sm text-grafite/70">{p.texto}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </PageContainer>
      </section>

      {/* IMPACTO (indicadores planejados) */}
      <section className="bg-white py-16">
        <PageContainer>
          <Reveal>
            <SectionHeading
              eyebrow="Nosso impacto"
              title="O que vamos acompanhar"
              subtitle="Indicadores planejados para medir o valor gerado. Ainda não exibimos resultados porque dependem do uso real da plataforma."
            />
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {indicadores.map((m, i) => (
              <Reveal key={m.titulo} delay={i * 90}>
                <div className="flex h-full items-start gap-4 rounded-3xl bg-offwhite p-6">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-folego-600 text-white">
                    <m.Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-extrabold text-folego-700">{m.titulo}</h3>
                    <p className="mt-1 text-sm text-grafite/70">{m.texto}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </PageContainer>
      </section>

      {/* ODS */}
      <section className="py-16">
        <PageContainer>
          <Reveal className="rounded-[2rem] bg-folego-700 p-8 text-white shadow-soft sm:p-12">
            <div className="flex items-center gap-3">
              <HeartHandshake className="h-7 w-7 text-salvia" aria-hidden />
              <h2 className="text-2xl font-extrabold">Conexão com os ODS da ONU</h2>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {ods.map((o) => (
                <div key={o.n} className="rounded-2xl bg-white/10 p-5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-base font-extrabold text-folego-700">
                    {o.n}
                  </span>
                  <h3 className="mt-3 font-extrabold">{o.titulo}</h3>
                  <p className="mt-1 text-sm text-white/80">{o.texto}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </PageContainer>
      </section>
    </div>
  );
}
