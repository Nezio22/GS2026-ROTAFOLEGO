import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Cookie, X } from "lucide-react";

const STORAGE_CONSENTIMENTO = "rotafolego:consentimento";

export default function ConsentBanner() {
  const [visivel, setVisivel] = useState(false);

  // Mostra o aviso só se a pessoa ainda não respondeu (lido do localStorage).
  useEffect(() => {
    try {
      const jaRespondeu = localStorage.getItem(STORAGE_CONSENTIMENTO);
      if (!jaRespondeu) setVisivel(true);
    } catch {
      // navegador sem acesso ao localStorage (aba anônima restrita): não insiste
    }
  }, []);

  function fechar() {
    try {
      localStorage.setItem(STORAGE_CONSENTIMENTO, "ok");
    } catch {
      // ignora: no pior caso o aviso reaparece na próxima visita
    }
    setVisivel(false);
  }

  if (!visivel) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Aviso de privacidade"
      className="fixed inset-x-0 bottom-0 z-40 p-3 sm:p-4"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-3 rounded-2xl border border-folego-100 bg-white p-4 shadow-soft motion-safe:animate-fade-up sm:flex-row sm:items-center sm:gap-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-folego-50 text-folego-600">
          <Cookie className="h-5 w-5" aria-hidden />
        </span>
        <p className="flex-1 text-sm text-grafite/80">
          Guardamos só favoritos e preferências de acessibilidade no seu navegador, para o site
          funcionar do seu jeito. Nada de rastreamento ou publicidade.{" "}
          <Link to="/privacidade" className="font-bold text-folego-700 underline underline-offset-2">
            Saiba mais
          </Link>
          .
        </p>
        <button
          type="button"
          onClick={fechar}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-folego-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-folego-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-folego-500 focus-visible:ring-offset-2"
        >
          <X className="h-4 w-4" aria-hidden />
          Entendi
        </button>
      </div>
    </div>
  );
}
