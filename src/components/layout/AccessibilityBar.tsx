import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { AArrowDown, AArrowUp, RotateCcw, Contrast, Volume2, Square, Gauge } from "lucide-react";

// Três níveis de fonte aplicados no <html> (rem escala o site inteiro).
const ESCALAS = [100, 112, 125];
const STORAGE_FONTE = "rotafolego:fonte";
const STORAGE_CONTRASTE = "rotafolego:contraste";
const STORAGE_VELOCIDADE = "rotafolego:velocidade";

// Velocidades da leitura em voz (rate da Web Speech API).
const VELOCIDADES = [
  { rate: 0.8, label: "Devagar" },
  { rate: 1, label: "Normal" },
  { rate: 1.3, label: "Rápido" },
];

const TEM_VOZ = typeof window !== "undefined" && "speechSynthesis" in window;

export default function AccessibilityBar() {
  const [nivel, setNivel] = useState(0);
  const [contraste, setContraste] = useState(false);
  const [lendo, setLendo] = useState(false);
  const [velIndex, setVelIndex] = useState(1);
  const { pathname } = useLocation();

  // Elemento atualmente destacado durante a leitura (para limpar depois).
  const destacadoRef = useRef<HTMLElement | null>(null);
  // Velocidade atual acessível de dentro dos callbacks da fala.
  const velRef = useRef(VELOCIDADES[1].rate);

  useEffect(() => {
    try {
      const salvo = Number(localStorage.getItem(STORAGE_FONTE));
      if (Number.isInteger(salvo) && salvo >= 0 && salvo < ESCALAS.length) {
        setNivel(salvo);
      }
      setContraste(localStorage.getItem(STORAGE_CONTRASTE) === "1");
      const vel = Number(localStorage.getItem(STORAGE_VELOCIDADE));
      if (Number.isInteger(vel) && vel >= 0 && vel < VELOCIDADES.length) {
        setVelIndex(vel);
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

  useEffect(() => {
    document.documentElement.classList.toggle("modo-contraste", contraste);
    try {
      localStorage.setItem(STORAGE_CONTRASTE, contraste ? "1" : "0");
    } catch {
      /* ignora */
    }
  }, [contraste]);

  useEffect(() => {
    velRef.current = VELOCIDADES[velIndex].rate;
    try {
      localStorage.setItem(STORAGE_VELOCIDADE, String(velIndex));
    } catch {
      /* ignora */
    }
  }, [velIndex]);

  function limparDestaque() {
    destacadoRef.current?.classList.remove("lendo-agora");
    destacadoRef.current = null;
  }

  function pararLeitura() {
    if (TEM_VOZ) window.speechSynthesis.cancel();
    limparDestaque();
    setLendo(false);
  }

  // Para a leitura ao trocar de página (o conteúdo já mudou).
  useEffect(() => {
    pararLeitura();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  function ouvirPagina() {
    if (!TEM_VOZ) return;
    if (lendo) {
      pararLeitura();
      return;
    }

    const conteudo = document.getElementById("conteudo");
    if (!conteudo) return;

    // Lê bloco a bloco: títulos, parágrafos e itens de lista com texto.
    const blocos = Array.from(
      conteudo.querySelectorAll<HTMLElement>("h1, h2, h3, h4, p, li")
    ).filter((el) => (el.innerText || "").trim().length > 1);

    if (blocos.length === 0) return;

    window.speechSynthesis.cancel();
    setLendo(true);

    const lerBloco = (i: number) => {
      if (i >= blocos.length) {
        limparDestaque();
        setLendo(false);
        return;
      }
      const el = blocos[i];
      limparDestaque();
      el.classList.add("lendo-agora");
      destacadoRef.current = el;
      el.scrollIntoView({ behavior: "smooth", block: "center" });

      const fala = new SpeechSynthesisUtterance(el.innerText.trim());
      fala.lang = "pt-BR";
      fala.rate = velRef.current;
      fala.onend = () => lerBloco(i + 1);
      fala.onerror = () => lerBloco(i + 1);
      window.speechSynthesis.speak(fala);
    };

    lerBloco(0);
  }

  const btn =
    "flex h-8 w-8 items-center justify-center rounded-md text-folego-700 transition hover:bg-folego-100 disabled:opacity-40 disabled:hover:bg-transparent";

  return (
    <div className="border-b border-folego-100/70 bg-folego-50/80">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-end gap-1 px-4 py-1.5">
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

        <span className="mx-1 h-4 w-px bg-folego-100" aria-hidden />

        <button
          type="button"
          onClick={() => setContraste((c) => !c)}
          aria-pressed={contraste}
          className={`flex h-8 items-center gap-1.5 rounded-md px-2 text-xs font-bold transition ${
            contraste ? "bg-folego-700 text-white" : "text-folego-700 hover:bg-folego-100"
          }`}
        >
          <Contrast className="h-4 w-4" aria-hidden />
          Alto contraste
        </button>

        {TEM_VOZ && (
          <>
            <button
              type="button"
              onClick={ouvirPagina}
              aria-pressed={lendo}
              aria-label={lendo ? "Parar a leitura em voz alta" : "Ouvir esta página em voz alta"}
              className={`flex h-8 items-center gap-1.5 rounded-md px-2 text-xs font-bold transition ${
                lendo ? "bg-folego-700 text-white" : "text-folego-700 hover:bg-folego-100"
              }`}
            >
              {lendo ? (
                <>
                  <Square className="h-4 w-4" aria-hidden />
                  Parar
                </>
              ) : (
                <>
                  <Volume2 className="h-4 w-4" aria-hidden />
                  Ouvir
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => setVelIndex((v) => (v + 1) % VELOCIDADES.length)}
              aria-label={`Velocidade da voz: ${VELOCIDADES[velIndex].label}. Clique para alterar.`}
              className="flex h-8 items-center gap-1.5 rounded-md px-2 text-xs font-bold text-folego-700 transition hover:bg-folego-100"
            >
              <Gauge className="h-4 w-4" aria-hidden />
              {VELOCIDADES[velIndex].label}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
