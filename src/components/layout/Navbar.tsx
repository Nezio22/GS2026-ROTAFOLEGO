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

  useEffect(() => {
    setAberto(false);
  }, [pathname]);

  const classeLink = ({ isActive }: { isActive: boolean }) =>
    `rounded-full px-4 py-2 text-sm font-bold transition ${
      isActive
        ? "bg-folego-600 text-white shadow-sm"
        : "text-grafite/70 hover:bg-folego-50 hover:text-folego-700"
    }`;

  return (
    <header className="sticky top-0 z-30 border-b border-folego-100/70 bg-offwhite/85 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <Link to="/" aria-label="Rota do Fôlego, página inicial" className="flex shrink-0 items-center">
          <img src="/logo-horizontal.png" alt="Rota do Fôlego" className="h-11 w-auto" />
        </Link>

        {/* Desktop: centralizada */}
        <div className="hidden flex-1 items-center justify-center gap-1 lg:flex">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={classeLink}>
              {l.label}
            </NavLink>
          ))}
        </div>

        {/* espaçador para equilibrar o logo e manter a nav centralizada */}
        <div className="hidden w-11 shrink-0 lg:block" aria-hidden />

        <button
          type="button"
          onClick={() => setAberto((v) => !v)}
          aria-label={aberto ? "Fechar menu" : "Abrir menu"}
          aria-expanded={aberto}
          aria-controls="menu-mobile"
          className="rounded-lg p-2 text-folego-700 transition hover:bg-folego-50 lg:hidden"
        >
          <span className="relative block h-6 w-6">
            <Menu
              className={`absolute inset-0 h-6 w-6 transition-all duration-300 motion-reduce:transition-none ${
                aberto ? "rotate-90 scale-50 opacity-0" : "rotate-0 scale-100 opacity-100"
              }`}
            />
            <X
              className={`absolute inset-0 h-6 w-6 transition-all duration-300 motion-reduce:transition-none ${
                aberto ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-50 opacity-0"
              }`}
            />
          </span>
        </button>
      </nav>

      {/* Menu mobile: animação de abrir e fechar (slide + fade com stagger) */}
      <div
        id="menu-mobile"
        aria-hidden={!aberto}
        className={`overflow-hidden border-folego-100 bg-offwhite transition-[max-height,opacity] duration-300 ease-out motion-reduce:transition-none lg:hidden ${
          aberto ? "max-h-[28rem] border-t opacity-100" : "pointer-events-none max-h-0 opacity-0"
        }`}
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
          {links.map((l, i) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              tabIndex={aberto ? undefined : -1}
              style={{ transitionDelay: aberto ? `${60 + i * 45}ms` : "0ms" }}
              className={({ isActive }) =>
                `transform rounded-full px-4 py-2 text-sm font-bold transition duration-300 ease-out motion-reduce:transition-none ${
                  aberto ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0"
                } ${
                  isActive
                    ? "bg-folego-600 text-white shadow-sm"
                    : "text-grafite/70 hover:bg-folego-50 hover:text-folego-700"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  );
}
