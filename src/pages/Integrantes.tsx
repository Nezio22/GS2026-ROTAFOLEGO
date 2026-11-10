import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageContainer from "../components/layout/PageContainer";
import Reveal from "../components/ui/Reveal";
import Badge from "../components/ui/Badge";
import { integrantes } from "../data/integrantes";

export default function Integrantes() {
  return (
    <div className="py-10 sm:py-14">
      <PageContainer>
        <Reveal className="max-w-2xl">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-folego-500">
            Equipe
          </p>
          <h1 className="mt-3 text-3xl font-extrabold text-folego-700 sm:text-4xl">
            As pessoas por trás de cada caminho.
          </h1>
          <p className="mt-3 text-grafite/80">
            Conheça quem transformou a ideia do Rota do Fôlego em tecnologia.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {integrantes.map((pessoa, i) => (
            <Reveal key={pessoa.slug} delay={i * 100}>
              <div className="flex h-full flex-col rounded-3xl border border-folego-100 bg-white p-6 text-center shadow-card transition hover:-translate-y-1 hover:shadow-soft">
                <div className="mx-auto h-28 w-28 overflow-hidden rounded-full bg-areia/50 ring-4 ring-folego-50">
                  <img
                    src={pessoa.avatar}
                    alt={`Avatar ilustrativo de ${pessoa.nome}`}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <h2 className="mt-4 text-lg font-extrabold text-folego-700">{pessoa.nome}</h2>
                <p className="mt-1 text-sm font-medium text-terracota">{pessoa.papel}</p>
                {pessoa.rm && <p className="mt-1 text-xs text-grafite/60">RM {pessoa.rm}</p>}

                <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                  {pessoa.disciplinas.map((d) => (
                    <Badge key={d} tone="salvia" className="text-[11px]">
                      {d}
                    </Badge>
                  ))}
                </div>

                <Link
                  to={`/integrante/${pessoa.slug}`}
                  className="mt-5 inline-flex items-center justify-center gap-1.5 self-center text-sm font-bold text-folego-600 transition hover:gap-2.5 hover:text-folego-700"
                >
                  Ver perfil
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-grafite/50">
          Os avatares são ilustrações conceituais e não representam fotografias reais das pessoas.
        </p>
      </PageContainer>
    </div>
  );
}
