import { useState } from "react";
import { Plus, Minus, HelpCircle, ArrowRight } from "lucide-react";
import PageContainer from "../components/layout/PageContainer";
import Reveal from "../components/ui/Reveal";
import Folha from "../components/ui/Folha";
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
    r: "Você marca os pontos de descanso por onde quer passar, ordena as paradas e o app mostra um resumo com distância e tempo estimados do percurso.",
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
    <div className="relative overflow-hidden py-10 sm:py-14">
      <Folha
        src="/images/09_Decorativos/canto-inf-esq.png"
        className="bottom-0 left-0 hidden w-52 opacity-25 lg:block"
      />
      <PageContainer>
        {/* Cabeçalho */}
        <Reveal className="max-w-2xl">
          <div className="flex items-center gap-2 text-folego-700">
            <HelpCircle className="h-7 w-7" aria-hidden />
            <h1 className="text-3xl font-extrabold sm:text-4xl">Perguntas frequentes</h1>
          </div>
          <p className="mt-2 text-grafite/80">Tire suas dúvidas sobre o Rota do Fôlego.</p>
        </Reveal>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          {/* Accordion de cards separados */}
          <Reveal className="space-y-3">
            {perguntas.map((item, i) => {
              const aberto = aberta === i;
              return (
                <div
                  key={i}
                  className={`overflow-hidden rounded-2xl border bg-white shadow-card transition ${
                    aberto ? "border-folego-300" : "border-folego-100"
                  }`}
                >
                  <h3>
                    <button
                      type="button"
                      onClick={() => setAberta(aberto ? null : i)}
                      aria-expanded={aberto}
                      aria-controls={`faq-painel-${i}`}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-bold text-folego-700"
                    >
                      {item.p}
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-folego-50 text-folego-600">
                        {aberto ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`faq-painel-${i}`}
                    role="region"
                    className="grid transition-all duration-300 ease-in-out"
                    style={{ gridTemplateRows: aberto ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-sm text-grafite/80">{item.r}</p>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* CTA */}
            <div className="mt-4 flex flex-col items-start gap-3 rounded-2xl bg-folego-700 p-5 text-white sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-bold">Ainda tem uma dúvida?</p>
              <Button to="/contato" variant="terracota" size="sm">
                Falar com a equipe
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
            </div>
          </Reveal>

          {/* Ilustração */}
          <Reveal delay={120} className="hidden lg:block lg:sticky lg:top-24">
            <img
              src="/images/06_FAQ/sinalizacao_descanso_acessibilidade.png"
              alt="Ilustração de sinalização de descanso e acessibilidade"
              loading="lazy"
              className="mx-auto max-h-[28rem] w-auto rounded-3xl object-contain"
            />
          </Reveal>
        </div>
      </PageContainer>
    </div>
  );
}
