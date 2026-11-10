import { Link } from "react-router-dom";

const navegacao = [
  { to: "/pontos", label: "Pontos de descanso" },
  { to: "/planejar", label: "Planejar trajeto" },
  { to: "/sobre", label: "Sobre o projeto" },
  { to: "/integrantes", label: "Integrantes" },
  { to: "/faq", label: "Perguntas frequentes" },
  { to: "/contato", label: "Contato" },
];

const ods = [
  { n: "11", label: "Cidades e comunidades sustentáveis" },
  { n: "3", label: "Saúde e bem-estar" },
  { n: "10", label: "Redução das desigualdades" },
];

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-folego-100 bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-[1.4fr_1fr_1.2fr]">
        {/* Marca */}
        <div>
          <img
            src="/logo-horizontal.png"
            alt="Rota do Fôlego"
            className="h-12 w-auto"
          />
          <p className="mt-4 max-w-xs text-sm text-grafite/70">
            Tecnologia que ajuda você a caminhar no seu ritmo, com um lugar para descansar.
          </p>
          <p className="mt-4 text-xs font-bold uppercase tracking-wider text-folego-500">
            CitizenTech · Global Solution 2026/2 · FIAP
          </p>
        </div>

        {/* Navegação */}
        <nav aria-label="Rodapé">
          <h3 className="text-sm font-extrabold text-folego-700">Navegação</h3>
          <ul className="mt-4 space-y-2">
            {navegacao.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-sm text-grafite/70 transition hover:text-folego-700"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* ODS */}
        <div>
          <h3 className="text-sm font-extrabold text-folego-700">
            Objetivos de Desenvolvimento Sustentável
          </h3>
          <ul className="mt-4 space-y-2">
            {ods.map((o) => (
              <li key={o.n} className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-folego-600 text-sm font-extrabold text-white">
                  {o.n}
                </span>
                <span className="text-sm text-grafite/70">{o.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-folego-100">
        <p className="mx-auto max-w-6xl px-4 py-5 text-xs text-grafite/60">
          © {new Date().getFullYear()} Rota do Fôlego — projeto acadêmico da Global Solution
          2026/2 (CitizenTech · FIAP). Referências: Agenda 2030 da ONU, UN-Habitat e ODS 3, 10 e 11.
        </p>
      </div>
    </footer>
  );
}
