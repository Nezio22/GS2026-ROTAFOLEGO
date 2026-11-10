import { BookOpen, Target, Lightbulb, Users, BarChart3 } from "lucide-react";
import PageContainer from "../components/layout/PageContainer";
import Reveal from "../components/ui/Reveal";
import Folha from "../components/ui/Folha";

const cards = [
  {
    Icon: Target,
    titulo: "O problema",
    texto:
      "Idosos, gestantes, pessoas com mobilidade reduzida e cardíacos precisam parar durante o trajeto. Mapas comuns otimizam a distância, mas não consideram pontos de descanso.",
  },
  {
    Icon: Lightbulb,
    titulo: "A solução",
    texto:
      "Um app colaborativo que registra pontos de descanso e monta trajetos a pé priorizando onde parar, construído pela própria comunidade.",
  },
  {
    Icon: Users,
    titulo: "Quem é beneficiado",
    texto:
      "Moradores com mobilidade reduzida, em qualquer bairro, da metrópole à cidade pequena.",
  },
  {
    Icon: BarChart3,
    titulo: "Como medimos o impacto",
    texto:
      "Nº de pontos cadastrados, nº de trajetos planejados, nota média dos pontos e distância média entre paradas.",
  },
];

export default function Sobre() {
  return (
    <section className="relative overflow-hidden">
      <img
        src="/images/00_Identidade_Visual/padrao_organico.png"
        alt=""
        aria-hidden
        className="pointer-events-none absolute -left-16 top-20 hidden w-64 opacity-10 lg:block"
      />
      <Folha
        src="/images/09_Decorativos/canto-inf-esq.png"
        className="bottom-0 left-0 hidden w-52 opacity-30 lg:block"
      />

      <PageContainer className="relative py-10 lg:py-16">
        <div className="lg:max-w-[58%]">
          <Reveal>
            <div className="flex items-center gap-2 text-folego-700">
              <BookOpen className="h-7 w-7" aria-hidden />
              <h1 className="text-3xl font-extrabold sm:text-4xl">Sobre o projeto</h1>
            </div>
            <p className="mt-3 max-w-xl text-grafite/80">
              O Rota do Fôlego nasceu de um problema real: andar a pé pela cidade é cansativo
              para quem tem menos fôlego, e faltam lugares sinalizados para descansar.
            </p>
          </Reveal>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {cards.map((c, i) => (
              <Reveal key={c.titulo} delay={i * 90}>
                <div className="flex h-full flex-col rounded-3xl border border-folego-100 bg-white p-6 shadow-card">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-folego-50 text-folego-600">
                    <c.Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h2 className="mt-4 text-lg font-extrabold text-folego-700">{c.titulo}</h2>
                  <p className="mt-2 text-sm text-grafite/70">{c.texto}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </PageContainer>

      {/* Imagem do idoso — bloco no celular, altura cheia à direita no desktop */}
      <div className="px-4 pb-10 lg:absolute lg:inset-y-0 lg:right-0 lg:w-[38%] lg:px-0 lg:pb-0">
        <img
          src="/images/08_Ilustracoes_Originais_Alta_Resolucao/ilustracao_pontos_paradas.png"
          alt="Grupo diverso caminhando por um parque com pontos de descanso e um abrigo coberto"
          className="h-60 w-full rounded-3xl object-cover sm:h-80 lg:h-full lg:rounded-none"
        />
        <div
          className="absolute inset-y-0 left-0 hidden w-32 bg-gradient-to-r from-offwhite to-transparent lg:block"
          aria-hidden
        />
      </div>
    </section>
  );
}
