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
  X,
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
  const [aberto, setAberto] = useState(false);
  const [nivel, setNivel] = useState(0);
  const [contraste, setContraste] = useState(false);
  const [lendo, setLendo] = useState(false);
  const [velIndex, setVelIndex] = useState(1);
  const [falarAoPassar, setFalarAoPassar] = useState(false);
  const { pathname } = useLocation();

  const widgetRef = useRef<HTMLDivElement>(null);
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

  // Fecha o painel ao clicar fora ou apertar Esc.
  useEffect(() => {
    if (!aberto) return;
    const onClick = (e: MouseEvent) => {
      if (!widgetRef.current?.contains(e.target as Node)) setAberto(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAberto(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [aberto]);

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
    const conteudo = document.getElementById("conteudo");
    if (!conteudo) return;

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

    conteudo.addEventListener("mouseover", onMouseOver);
    conteudo.addEventListener("mouseout", onMouseOut);
    conteudo.addEventListener("touchstart", onTouch, { passive: true });
    return () => {
      conteudo.removeEventListener("mouseover", onMouseOver);
      conteudo.removeEventListener("mouseout", onMouseOut);
      conteudo.removeEventListener("touchstart", onTouch);
      window.speechSynthesis.cancel();
    };
  }, [falarAoPassar]);

  const linha = "flex items-center justify-between gap-3";
  const chip =
    "flex h-9 w-9 items-center justify-center rounded-lg border border-folego-100 text-folego-700 transition hover:bg-folego-50 disabled:opacity-40 disabled:hover:bg-transparent";
  const toggle = (ativo: boolean) =>
    `flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-bold transition ${
      ativo ? "bg-folego-700 text-white" : "border border-folego-100 text-folego-700 hover:bg-folego-50"
    }`;

  return (
    <div ref={widgetRef} className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
      {/* Painel */}
      {aberto && (
        <div
          role="dialog"
          aria-label="Opções de acessibilidade"
          className="absolute bottom-16 right-0 w-[min(19rem,calc(100vw-2rem))] rounded-3xl border border-folego-100 bg-white p-5 shadow-soft"
        >
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-base font-extrabold text-folego-700">Acessibilidade</h2>
            <button
              type="button"
              onClick={() => setAberto(false)}
              aria-label="Fechar"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-grafite/60 transition hover:bg-folego-50"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          </div>

          <div className="space-y-4">
            {/* Tamanho da fonte */}
            <div className={linha}>
              <span className="text-sm font-semibold text-grafite/80">Tamanho da fonte</span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setNivel((n) => Math.max(0, n - 1))}
                  disabled={nivel === 0}
                  aria-label="Diminuir tamanho da fonte"
                  className={chip}
                >
                  <AArrowDown className="h-4 w-4" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={() => setNivel(0)}
                  disabled={nivel === 0}
                  aria-label="Restaurar tamanho padrão da fonte"
                  className={chip}
                >
                  <RotateCcw className="h-4 w-4" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={() => setNivel((n) => Math.min(ESCALAS.length - 1, n + 1))}
                  disabled={nivel === ESCALAS.length - 1}
                  aria-label="Aumentar tamanho da fonte"
                  className={chip}
                >
                  <AArrowUp className="h-4 w-4" aria-hidden />
                </button>
              </div>
            </div>

            {/* Alto contraste */}
            <button
              type="button"
              onClick={() => setContraste((c) => !c)}
              aria-pressed={contraste}
              className={toggle(contraste)}
            >
              <Contrast className="h-4 w-4" aria-hidden />
              Alto contraste{contraste ? ": ligado" : ""}
            </button>

            {TEM_VOZ && (
              <div className="space-y-2 border-t border-folego-100 pt-4">
                <button
                  type="button"
                  onClick={ouvirPagina}
                  aria-pressed={lendo}
                  className={toggle(lendo)}
                >
                  {lendo ? (
                    <>
                      <Square className="h-4 w-4" aria-hidden />
                      Parar leitura
                    </>
                  ) : (
                    <>
                      <Volume2 className="h-4 w-4" aria-hidden />
                      Ouvir a página
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setVelIndex((v) => (v + 1) % VELOCIDADES.length)}
                  aria-label={`Velocidade da voz: ${VELOCIDADES[velIndex].label}. Clique para alterar.`}
                  className={toggle(false)}
                >
                  <Gauge className="h-4 w-4" aria-hidden />
                  Velocidade: {VELOCIDADES[velIndex].label}
                </button>
                <button
                  type="button"
                  onClick={() => setFalarAoPassar((v) => !v)}
                  aria-pressed={falarAoPassar}
                  className={toggle(falarAoPassar)}
                >
                  <Hand className="h-4 w-4" aria-hidden />
                  Falar ao passar{falarAoPassar ? ": ligado" : ""}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bolinha flutuante */}
      <button
        type="button"
        onClick={() => setAberto((v) => !v)}
        aria-expanded={aberto}
        aria-label={aberto ? "Fechar opções de acessibilidade" : "Abrir opções de acessibilidade"}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-folego-600 shadow-soft transition hover:bg-folego-700 focus-visible:ring-2 focus-visible:ring-folego-500 focus-visible:ring-offset-2"
      >
        <img src="/acessibilidade.png" alt="" aria-hidden className="h-8 w-8" />
      </button>
    </div>
  );
}
