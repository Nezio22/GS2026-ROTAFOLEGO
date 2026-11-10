import { useState } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import PageContainer from "../components/layout/PageContainer";
import Reveal from "../components/ui/Reveal";
import Button from "../components/ui/Button";

const perguntas = [
  {
    p: "O que é um ponto de descanso?",
    r: "É qualquer lugar onde dá para parar e recuperar o fôlego: um banco, uma sombra de árvore, uma marquise, um bebedouro ou um banheiro acessível.",
  },
  {
    p: "Quem pode cadastrar um ponto?",
    r: "Qualquer pessoa. O app é colaborativo: você adiciona os pontos que conhece e ajuda outros moradores a planejar caminhos mais confortáveis.",
  },
  {
    p: "Como funciona o planejamento do trajeto?",
    r: "Você escolhe os pontos de descanso por onde quer passar e o app mostra um resumo com o número de paradas e a ordem do percurso.",
  },
  {
    p: "Preciso pagar para usar?",
    r: "Não. O uso pelo cidadão é gratuito. O modelo de negócio prevê convênios com prefeituras e organizações de saúde.",
  },
  {
    p: "O app funciona no celular?",
    r: "Sim. A interface é responsiva e foi pensada primeiro para o celular, com textos legíveis e botões confortáveis de tocar.",
  },
];

export default function Faq() {
  const [aberta, setAberta] = useState<number | null>(0);

  return (
    <div className="py-10 sm:py-14">
      <PageContainer className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:items-start">
        {/* Esquerda */}
        <Reveal className="lg:sticky lg:top-24">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-folego-500">
            Perguntas frequentes
          </p>
          <h1 className="mt-3 text-3xl font-extrabold text-folego-700 sm:text-4xl">
            Dúvidas sobre o caminho? A gente ajuda.
          </h1>
          <p className="mt-3 text-grafite/80">
            Reunimos as perguntas mais comuns sobre como o Rota do Fôlego funciona.
          </p>
          <img
            src="/images/06_FAQ/sinalizacao_descanso_acessibilidade.png"
            alt="Ilustração de sinalização de descanso e acessibilidade"
            loading="lazy"
            className="mt-6 hidden max-h-80 w-auto rounded-3xl object-contain lg:block"
          />
        </Reveal>

        {/* Direita — accordion */}
        <Reveal delay={100}>
          <div className="divide-y divide-folego-100 overflow-hidden rounded-3xl border border-folego-100 bg-white shadow-card">
            {perguntas.map((item, i) => {
              const aberto = aberta === i;
              return (
                <div key={i}>
                  <h3>
                    <button
                      type="button"
                      onClick={() => setAberta(aberto ? null : i)}
                      aria-expanded={aberto}
                      aria-controls={`faq-painel-${i}`}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-bold text-folego-700 transition hover:bg-folego-50/60"
                    >
                      {item.p}
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-folego-500 transition-transform duration-300 ${
                          aberto ? "rotate-180" : ""
                        }`}
                        aria-hidden
                      />
                    </button>
                  </h3>
                  <div
                    id={`faq-painel-${i}`}
                    role="region"
                    className="grid transition-all duration-300 ease-in-out"
                    style={{ gridTemplateRows: aberto ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-5 text-sm text-grafite/80">{item.r}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-8 flex flex-col items-start gap-4 rounded-3xl bg-folego-700 p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <h2 className="text-lg font-extrabold">Ainda tem uma dúvida?</h2>
              <p className="mt-1 text-sm text-white/80">Fale com a nossa equipe.</p>
            </div>
            <Button to="/contato" variant="terracota">
              Falar com a equipe
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
          </div>
        </Reveal>
      </PageContainer>
    </div>
  );
}
