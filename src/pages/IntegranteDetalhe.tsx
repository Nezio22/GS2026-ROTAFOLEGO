import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Github, Check } from "lucide-react";
import PageContainer from "../components/layout/PageContainer";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import { integrantes } from "../data/integrantes";
import Folha from "../components/ui/Folha";

// Rota dinâmica preservada: /integrante/:rm (o valor usado é o slug do integrante)
export default function IntegranteDetalhe() {
  const { rm } = useParams<{ rm: string }>();
  const pessoa = integrantes.find((p) => p.slug === rm);

  if (!pessoa) {
    return (
      <PageContainer className="py-16" size="narrow">
        <p className="text-grafite/70">Integrante não encontrado.</p>
        <Link
          to="/integrantes"
          className="mt-4 inline-flex items-center gap-2 font-bold text-folego-600 hover:text-folego-700"
        >
          <ArrowLeft className="h-4 w-4" /> Voltar
        </Link>
      </PageContainer>
    );
  }

  return (
    <div className="relative overflow-hidden py-10 sm:py-14">
      <Folha
        src="/images/09_Decorativos/folhas-vento.png"
        className="right-0 top-10 hidden w-56 opacity-20 lg:block"
      />
      <PageContainer size="narrow">
        <Link
          to="/integrantes"
          className="inline-flex items-center gap-2 text-sm font-bold text-folego-600 hover:text-folego-700"
        >
          <ArrowLeft className="h-4 w-4" /> Voltar para integrantes
        </Link>

        <div className="mt-6 rounded-3xl border border-folego-100 bg-white p-6 shadow-card sm:p-10">
          <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:text-left">
            <div className="h-28 w-28 shrink-0 overflow-hidden rounded-full bg-areia/50 ring-4 ring-folego-50">
              <img
                src={pessoa.avatar}
                alt={`Avatar ilustrativo de ${pessoa.nome}`}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-folego-700">{pessoa.nome}</h1>
              <p className="mt-1 font-medium text-terracota">{pessoa.papel}</p>
              {pessoa.rm && <p className="mt-1 text-sm text-grafite/60">RM {pessoa.rm}</p>}
              <div className="mt-3 flex flex-wrap justify-center gap-1.5 sm:justify-start">
                {pessoa.disciplinas.map((d) => (
                  <Badge key={d} tone="salvia">
                    {d}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-extrabold text-folego-700">Contribuições no projeto</h2>
            <ul className="mt-4 space-y-2.5">
              {pessoa.contribuicoes.map((c) => (
                <li key={c} className="flex items-start gap-2.5 text-grafite/80">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-folego-600" aria-hidden />
                  {c}
                </li>
              ))}
            </ul>
          </div>

          {pessoa.github && (
            <div className="mt-8">
              <Button href={pessoa.github} variant="outline" size="sm">
                <Github className="h-4 w-4" aria-hidden />
                GitHub
              </Button>
            </div>
          )}
        </div>
      </PageContainer>
    </div>
  );
}
