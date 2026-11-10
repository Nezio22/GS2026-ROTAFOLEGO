import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/pontos", label: "Pontos" },
  { to: "/planejar", label: "Planejar" },
  { to: "/sobre", label: "Sobre" },
  { to: "/integrantes", label: "Integrantes" },
  { to: "/faq", label: "FAQ" },
  { to: "/contato", label: "Contato" },
];

export default function Navbar() {
  const [aberto, setAberto] = useState(false);

  const classeLink = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 text-sm font-medium rounded-md transition ${
      isActive
        ? "bg-folego-50 text-folego-700"
        : "text-slate-600 hover:text-folego-700 hover:bg-slate-100"
    }`;

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5">
        <Link to="/" className="flex items-center" onClick={() => setAberto(false)}>
          <img
            src="/logo-horizontal.png"
            alt="Rota do Fôlego"
            className="h-12 w-auto"
          />
        </Link>

        {/* Menu desktop */}
        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={classeLink}>
              {l.label}
            </NavLink>
          ))}
        </div>

        {/* Botão do menu mobile */}
        <button
          type="button"
          className="rounded-md p-2 text-slate-600 hover:bg-slate-100 md:hidden"
          aria-label="Abrir menu"
          aria-expanded={aberto}
          onClick={() => setAberto((v) => !v)}
        >
          <span className="block text-2xl leading-none">{aberto ? "×" : "☰"}</span>
        </button>
      </nav>

      {/* Menu mobile */}
      {aberto && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col px-4 py-2">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={classeLink}
                onClick={() => setAberto(false)}
              >
                {l.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
