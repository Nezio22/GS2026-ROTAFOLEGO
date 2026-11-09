import { Link } from "react-router-dom";
import Card from "../components/Card";
import Button from "../components/Button";

const recursos = [
  {
    titulo: "Pontos de descanso",
    texto: "Bancos, sombra, marquises, bebedouros e banheiros acessíveis, perto de você.",
  },
  {
    titulo: "Trajeto com paradas",
    texto: "Monte um caminho escolhendo onde descansar, no seu ritmo.",
  },
  {
    titulo: "Feito pela comunidade",
    texto: "Qualquer pessoa cadastra e avalia pontos para ajudar os vizinhos.",
  },
];

export default function Home() {
  return (
    <div className="space-y-14">
      {/* Hero */}
      <section className="rounded-2xl bg-folego-900 px-6 py-14 text-white sm:px-10">
        <p className="text-sm font-semibold uppercase tracking-widest text-folego-500">
          CitizenTech · Global Solution 2026/2
        </p>
        <h1 className="mt-3 max-w-2xl text-4xl font-bold leading-tight sm:text-5xl">
          Caminhe no seu ritmo, com um lugar para descansar.
        </h1>
        <p className="mt-4 max-w-xl text-slate-300">
          O Rota do Fôlego planeja o seu trajeto a pé priorizando pontos de descanso —
          pensado para idosos, gestantes e pessoas com mobilidade reduzida.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/pontos">
            <Button>Ver pontos de descanso</Button>
          </Link>
          <Link to="/planejar">
            <Button variant="outline" className="border-white text-white hover:bg-white/10">
              Planejar um trajeto
            </Button>
          </Link>
        </div>
      </section>

      {/* Recursos */}
      <section>
        <h2 className="text-2xl font-bold text-folego-900">Como ajuda</h2>
        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
          {recursos.map((r) => (
            <Card key={r.titulo}>
              <h3 className="text-lg font-semibold text-folego-700">{r.titulo}</h3>
              <p className="mt-2 text-sm text-slate-600">{r.texto}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* ODS */}
      <section className="rounded-2xl border border-slate-200 bg-white px-6 py-8">
        <h2 className="text-2xl font-bold text-folego-900">Impacto (ODS da ONU)</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <span className="rounded-full bg-folego-50 px-4 py-2 text-sm font-medium text-folego-800">
            11 · Cidades e comunidades sustentáveis
          </span>
          <span className="rounded-full bg-folego-50 px-4 py-2 text-sm font-medium text-folego-800">
            3 · Saúde e bem-estar
          </span>
          <span className="rounded-full bg-folego-50 px-4 py-2 text-sm font-medium text-folego-800">
            10 · Redução das desigualdades
          </span>
        </div>
      </section>
    </div>
  );
}
