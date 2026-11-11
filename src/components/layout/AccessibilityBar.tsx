import { useEffect, useState } from "react";
import { AArrowDown, AArrowUp, RotateCcw } from "lucide-react";

// Três níveis de fonte aplicados no <html> (rem escala o site inteiro).
const ESCALAS = [100, 112, 125];
const STORAGE_FONTE = "rotafolego:fonte";

export default function AccessibilityBar() {
  const [nivel, setNivel] = useState(0);

  useEffect(() => {
    try {
      const salvo = Number(localStorage.getItem(STORAGE_FONTE));
      if (Number.isInteger(salvo) && salvo >= 0 && salvo < ESCALAS.length) {
        setNivel(salvo);
      }
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
      </div>
    </div>
  );
}
