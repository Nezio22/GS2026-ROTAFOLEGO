import { Link } from "react-router-dom";
import { ArrowRight, Github, Users } from "lucide-react";
import PageContainer from "../components/layout/PageContainer";
import Reveal from "../components/ui/Reveal";
import { integrantes } from "../data/integrantes";

export default function Integrantes() {
  return (
    <section className="relative overflow-hidden py-10 sm:py-14">
      <PageContainer className="relative">
        <Reveal className="max-w-2xl">
          <div className="flex items-center gap-2 text-folego-700">
            <Users className="h-7 w-7" aria-hidden />
            <h1 className="text-3xl font-extrabold sm:text-4xl">Integrantes</h1>
          </div>
          <p className="mt-2 text-grafite/80">O time por trás do Rota do Fôlego.</p>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {integrantes.map((pessoa, i) => (
            <Reveal key={pessoa.slug} delay={i * 100}>
              <div className="relative flex h-full flex-col rounded-3xl border border-folego-100 bg-white p-6 shadow-card transition hover:-translate-y-1 hover:shadow-soft">
                {/* GitHub */}
                {pessoa.github && (
                  <a
                    href={pessoa.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`GitHub de ${pessoa.nome}`}
                    className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-lg bg-folego-900 text-white transition hover:opacity-90"
                  >
                    <Github className="h-4 w-4" aria-hidden />
                  </a>
                )}

                <div className="h-24 w-24 overflow-hidden rounded-full bg-areia/50 ring-4 ring-folego-50">
                  <img
                    src={pessoa.avatar}
                    alt={`Avatar ilustrativo de ${pessoa.nome}`}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>

                <h2 className="mt-4 text-xl font-extrabold text-folego-700">{pessoa.nome}</h2>
                <p className="mt-1 text-sm text-grafite/70">{pessoa.papel}</p>
                {pessoa.rm && (
                  <p className="mt-2 text-sm text-grafite/50">· RM {pessoa.rm}</p>
                )}

                <Link
                  to={`/integrante/${pessoa.slug}`}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-folego-600 transition hover:gap-2.5 hover:text-folego-700"
                >
                  Ver perfil
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-xs text-grafite/50">
          Os avatares são ilustrações conceituais e não representam fotografias reais das pessoas.
        </p>
      </PageContainer>
    </section>
  );
}
