import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  AArrowDown,
  AArrowUp,
  RotateCcw,
  Contrast,
  Volume2,
  Square,
  Gauge,
  Hand,
} from "lucide-react";

// Três níveis de fonte aplicados no <html> (rem escala o site inteiro).
const ESCALAS = [100, 112, 125];
const STORAGE_FONTE = "rotafolego:fonte";
const STORAGE_CONTRASTE = "rotafolego:contraste";
const STORAGE_VELOCIDADE = "rotafolego:velocidade";
const STORAGE_PASSAR = "rotafolego:falarAoPassar";

// Velocidades da leitura em voz (rate da Web Speech API).
const VELOCIDADES = [
  { rate: 0.8, label: "Devagar" },
  { rate: 1, label: "Normal" },
  { rate: 1.3, label: "Rápido" },
];

// Blocos de texto que a leitura em voz considera.
const SELETOR_BLOCOS = "h1, h2, h3, h4, p, li, a, button";

const TEM_VOZ = typeof window !== "undefined" && "speechSynthesis" in window;

export default function AccessibilityBar() {
  const [nivel, setNivel] = useState(0);
  const [contraste, setContraste] = useState(false);
  const [lendo, setLendo] = useState(false);
  const [velIndex, setVelIndex] = useState(1);
  const [falarAoPassar, setFalarAoPassar] = useState(false);
  const { pathname } = useLocation();

  // Elemento atualmente destacado durante a leitura (para limpar depois).
  const destacadoRef = useRef<HTMLElement | null>(null);
  // Velocidade atual acessível de dentro dos callbacks da fala.
  const velRef = useRef(VELOCIDADES[1].rate);
  // Identifica a "sessão" de leitura atual. Mudar de pagina ou parar
  // incrementa este valor, invalidando qualquer leitura em andamento
  // (o cancel() da fala dispara onend, entao precisamos deste guarda).
  const sessaoRef = useRef(0);

  useEffect(() => {
    try {
      const salvo = Number(localStorage.getItem(STORAGE_FONTE));
      if (Number.isInteger(salvo) && salvo >= 0 && salvo < ESCALAS.length) {
        setNivel(salvo);
      }
      setContraste(localStorage.getItem(STORAGE_CONTRASTE) === "1");
      setFalarAoPassar(localStorage.getItem(STORAGE_PASSAR) === "1");
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

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_PASSAR, falarAoPassar ? "1" : "0");
    } catch {
      /* ignora */
    }
  }, [falarAoPassar]);

  function limparDestaque() {
    destacadoRef.current?.classList.remove("lendo-agora");
    destacadoRef.current = null;
  }

  // Interrompe qualquer leitura em andamento e invalida a sessao atual.
  function pararLeitura() {
    sessaoRef.current += 1;
    if (TEM_VOZ) window.speechSynthesis.cancel();
    limparDestaque();
    setLendo(false);
  }

  // Ao trocar de pagina: para a leitura. So recomeça se o usuario clicar.
  useEffect(() => {
    pararLeitura();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Para a fala tambem quando o componente sair da tela.
  useEffect(() => {
    return () => {
      if (TEM_VOZ) window.speechSynthesis.cancel();
    };
  }, []);

  function ouvirPagina() {
    if (!TEM_VOZ) return;
    if (lendo) {
      pararLeitura();
      return;
    }

    const conteudo = document.getElementById("conteudo");
    if (!conteudo) return;

    const blocos = Array.from(
      conteudo.querySelectorAll<HTMLElement>("h1, h2, h3, h4, p, li")
    ).filter((el) => (el.innerText || "").trim().length > 1);

    if (blocos.length === 0) return;

    // Abre uma nova sessao de leitura.
    sessaoRef.current += 1;
    const sessao = sessaoRef.current;
    window.speechSynthesis.cancel();
    setLendo(true);

    const lerBloco = (i: number) => {
      // Se a sessao mudou (troca de pagina, parar, hover), nao continua.
      if (sessao !== sessaoRef.current) return;
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
      fala.onend = () => {
        if (sessao === sessaoRef.current) lerBloco(i + 1);
      };
      fala.onerror = () => {
        if (sessao === sessaoRef.current) lerBloco(i + 1);
      };
      window.speechSynthesis.speak(fala);
    };

    lerBloco(0);
  }

  // Modo "falar ao passar": le o item sob o mouse (desktop) ou o toque (celular).
  useEffect(() => {
    if (!TEM_VOZ || !falarAoPassar) return;
    const alvo = (e: Event) =>
      (e.target as HTMLElement | null)?.closest<HTMLElement>(SELETOR_BLOCOS) ?? null;
    let ultimo: HTMLElement | null = null;

    const falarItem = (el: HTMLElement | null) => {
      if (!el || el === ultimo) return;
      const texto = (el.innerText || "").trim();
      if (!texto) return;
      ultimo = el;
      // Interrompe qualquer leitura de pagina em andamento.
      sessaoRef.current += 1;
      limparDestaque();
      setLendo(false);
      window.speechSynthesis.cancel();
      const fala = new SpeechSynthesisUtterance(texto);
      fala.lang = "pt-BR";
      fala.rate = velRef.current;
      window.speechSynthesis.speak(fala);
    };

    const onMouseOver = (e: Event) => falarItem(alvo(e));
    const onMouseOut = () => {
      ultimo = null;
    };
    const onTouch = (e: Event) => falarItem(alvo(e));

    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);
    document.addEventListener("touchstart", onTouch, { passive: true });
    return () => {
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      document.removeEventListener("touchstart", onTouch);
      window.speechSynthesis.cancel();
    };
  }, [falarAoPassar]);

  const btn =
    "flex h-8 w-8 items-center justify-center rounded-md text-folego-700 transition hover:bg-folego-100 disabled:opacity-40 disabled:hover:bg-transparent";
  const pill = (ativo: boolean) =>
    `flex h-8 items-center gap-1.5 rounded-md px-2 text-xs font-bold transition ${
      ativo ? "bg-folego-700 text-white" : "text-folego-700 hover:bg-folego-100"
    }`;

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
          className={pill(contraste)}
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
              className={pill(lendo)}
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
            <button
              type="button"
              onClick={() => setFalarAoPassar((v) => !v)}
              aria-pressed={falarAoPassar}
              aria-label="Falar o item ao passar o mouse ou o dedo por cima"
              className={pill(falarAoPassar)}
            >
              <Hand className="h-4 w-4" aria-hidden />
              Falar ao passar
            </button>
          </>
        )}
      </div>
    </div>
  );
}
