import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

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
  const { pathname } = useLocation();

  // fecha o menu ao trocar de rota
  useEffect(() => {
    setAberto(false);
  }, [pathname]);

  const classeLink = ({ isActive }: { isActive: boolean }) =>
    `rounded-lg px-3 py-2 text-sm font-bold transition ${
      isActive
        ? "bg-folego-50 text-folego-700"
        : "text-grafite/70 hover:bg-folego-50 hover:text-folego-700"
    }`;

  return (
    <header className="sticky top-0 z-30 border-b border-folego-100/70 bg-offwhite/85 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <Link to="/" aria-label="Rota do Fôlego — início" className="flex shrink-0 items-center">
          <img src="/logo-horizontal.png" alt="Rota do Fôlego" className="h-11 w-auto" />
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={classeLink}>
              {l.label}
            </NavLink>
          ))}
        </div>

        {/* Botão mobile */}
        <button
          type="button"
          onClick={() => setAberto((v) => !v)}
          aria-label={aberto ? "Fechar menu" : "Abrir menu"}
          aria-expanded={aberto}
          className="rounded-lg p-2 text-folego-700 hover:bg-folego-50 lg:hidden"
        >
          {aberto ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Menu mobile */}
      {aberto && (
        <div className="border-t border-folego-100 bg-offwhite lg:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.end} className={classeLink}>
                {l.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
