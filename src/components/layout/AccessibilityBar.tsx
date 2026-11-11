import { useEffect, useState } from "react";
import { AArrowDown, AArrowUp, RotateCcw, Contrast } from "lucide-react";

// Três níveis de fonte aplicados no <html> (rem escala o site inteiro).
const ESCALAS = [100, 112, 125];
const STORAGE_FONTE = "rotafolego:fonte";
const STORAGE_CONTRASTE = "rotafolego:contraste";

export default function AccessibilityBar() {
  const [nivel, setNivel] = useState(0);
  const [contraste, setContraste] = useState(false);

  useEffect(() => {
    try {
      const salvo = Number(localStorage.getItem(STORAGE_FONTE));
      if (Number.isInteger(salvo) && salvo >= 0 && salvo < ESCALAS.length) {
        setNivel(salvo);
      }
      setContraste(localStorage.getItem(STORAGE_CONTRASTE) === "1");
    } catch {
      /* ignora */
    }
  }, []);

  useEffect(() => {
    document.documentElement.style.fontSize = `${ESCALAS[nivel]}%`;
    try {
      localStorage.setItem(STORAGE_FONTE, String(nivel));
    } catch {
      /* ignora */
    }
  }, [nivel]);

  useEffect(() => {
    document.documentElement.classList.toggle("modo-contraste", contraste);
    try {
      localStorage.setItem(STORAGE_CONTRASTE, contraste ? "1" : "0");
    } catch {
      /* ignora */
    }
  }, [contraste]);

  const btn =
    "flex h-8 w-8 items-center justify-center rounded-md text-folego-700 transition hover:bg-folego-100 disabled:opacity-40 disabled:hover:bg-transparent";

  return (
    <div className="border-b border-folego-100/70 bg-folego-50/80">
      <div className="mx-auto flex max-w-6xl items-center justify-end gap-1 px-4 py-1.5">
        <span className="mr-1 text-xs font-bold uppercase tracking-wide text-folego-700/70">
          Acessibilidade
        </span>
        <button
          type="button"
          onClick={() => setNivel((n) => Math.max(0, n - 1))}
          disabled={nivel === 0}
          aria-label="Diminuir tamanho da fonte"
          className={btn}
        >
          <AArrowDown className="h-4 w-4" aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => setNivel(0)}
          disabled={nivel === 0}
          aria-label="Restaurar tamanho padrão da fonte"
          className={btn}
        >
          <RotateCcw className="h-4 w-4" aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => setNivel((n) => Math.min(ESCALAS.length - 1, n + 1))}
          disabled={nivel === ESCALAS.length - 1}
          aria-label="Aumentar tamanho da fonte"
          className={btn}
        >
          <AArrowUp className="h-4 w-4" aria-hidden />
        </button>

        <span className="mx-1 h-4 w-px bg-folego-200" aria-hidden />

        <button
          type="button"
          onClick={() => setContraste((c) => !c)}
          aria-pressed={contraste}
          className={`flex h-8 items-center gap-1.5 rounded-md px-2 text-xs font-bold transition ${
            contraste
              ? "bg-folego-700 text-white"
              : "text-folego-700 hover:bg-folego-100"
          }`}
        >
          <Contrast className="h-4 w-4" aria-hidden />
          Alto contraste
        </button>
      </div>
    </div>
  );
}
