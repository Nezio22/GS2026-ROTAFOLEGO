import { useEffect, useRef, useState, type ReactNode, type KeyboardEvent } from "react";
import { ChevronDown, Check } from "lucide-react";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  ariaLabel?: string;
  icon?: ReactNode;
  className?: string;
}

/**
 * Select customizado com a identidade do site (dropdown verde, Nunito),
 * no lugar do <select> nativo (que usa a cor azul do sistema).
 * Acessível: teclado (setas, Enter, Esc, Home/End) e padrão listbox.
 */
export default function Select({
  value,
  onChange,
  options,
  ariaLabel,
  icon,
  className = "",
}: SelectProps) {
  const [aberto, setAberto] = useState(false);
  const [ativo, setAtivo] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const selecionada = options.find((o) => o.value === value);

  useEffect(() => {
    function fora(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setAberto(false);
    }
    document.addEventListener("mousedown", fora);
    return () => document.removeEventListener("mousedown", fora);
  }, []);

  function abrir() {
    const idx = options.findIndex((o) => o.value === value);
    setAtivo(idx < 0 ? 0 : idx);
    setAberto(true);
  }

  function escolher(v: string) {
    onChange(v);
    setAberto(false);
  }

  function onKey(e: KeyboardEvent) {
    if (!aberto) {
      if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        abrir();
      }
      return;
    }
    if (e.key === "Escape") {
      setAberto(false);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setAtivo((i) => Math.min(i + 1, options.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setAtivo((i) => Math.max(i - 1, 0));
    } else if (e.key === "Home") {
      e.preventDefault();
      setAtivo(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setAtivo(options.length - 1);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      escolher(options[ativo].value);
    }
  }

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => (aberto ? setAberto(false) : abrir())}
        onKeyDown={onKey}
        aria-haspopup="listbox"
        aria-expanded={aberto}
        aria-label={ariaLabel}
        className="flex w-full items-center justify-between gap-2 rounded-xl border border-folego-100 bg-white px-3.5 py-2.5 text-sm font-medium text-folego-700 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-folego-500/40"
      >
        <span className="flex min-w-0 items-center gap-2 truncate">
          {icon}
          <span className="truncate">{selecionada?.label ?? ""}</span>
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-folego-500 transition-transform ${
            aberto ? "rotate-180" : ""
          }`}
          aria-hidden
        />
      </button>

      {aberto && (
        <ul
          role="listbox"
          aria-label={ariaLabel}
          className="absolute z-20 mt-2 max-h-64 w-full min-w-[12rem] overflow-auto rounded-xl border border-folego-100 bg-white p-1.5 shadow-soft"
        >
          {options.map((o, i) => {
            const sel = o.value === value;
            const destaque = i === ativo;
            return (
              <li
                key={o.value}
                role="option"
                aria-selected={sel}
                onMouseEnter={() => setAtivo(i)}
                onClick={() => escolher(o.value)}
                className={`flex cursor-pointer items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm ${
                  sel
                    ? "bg-folego-600 font-bold text-white"
                    : destaque
                    ? "bg-folego-50 text-folego-700"
                    : "text-grafite"
                }`}
              >
                <span className="truncate">{o.label}</span>
                {sel && <Check className="h-4 w-4 shrink-0" aria-hidden />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
