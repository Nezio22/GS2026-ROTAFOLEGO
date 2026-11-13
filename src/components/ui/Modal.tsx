import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

interface ModalProps {
  aberto: boolean;
  onFechar: () => void;
  titulo?: string;
  children: ReactNode;
}

const DURACAO_SAIDA = 200;

export default function Modal({ aberto, onFechar, titulo, children }: ModalProps) {
  // Mantém o modal montado durante a animação de saída.
  const [montado, setMontado] = useState(aberto);
  const [saindo, setSaindo] = useState(false);

  useEffect(() => {
    if (aberto) {
      setMontado(true);
      setSaindo(false);
      return;
    }
    if (montado) {
      setSaindo(true);
      const t = setTimeout(() => {
        setMontado(false);
        setSaindo(false);
      }, DURACAO_SAIDA);
      return () => clearTimeout(t);
    }
  }, [aberto, montado]);

  useEffect(() => {
    if (!montado) return;

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onFechar();
    }
    document.addEventListener("keydown", onKey);

    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflowAnterior;
    };
  }, [montado, onFechar]);

  if (!montado) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-grafite/50 p-4 backdrop-blur-sm sm:items-center sm:p-6 ${
        saindo ? "motion-safe:animate-overlay-out" : "motion-safe:animate-overlay-in"
      }`}
      onClick={onFechar}
      role="dialog"
      aria-modal="true"
      aria-label={titulo}
    >
      <div
        className={`relative my-auto w-full max-w-2xl ${
          saindo ? "motion-safe:animate-modal-out" : "motion-safe:animate-modal-in"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onFechar}
          aria-label="Fechar"
          className="absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-grafite transition hover:rotate-90 hover:bg-folego-50 hover:text-folego-700"
        >
          <X className="h-5 w-5" aria-hidden />
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}
