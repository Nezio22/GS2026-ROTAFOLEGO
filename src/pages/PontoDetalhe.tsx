import { useEffect, useState, type FormEvent } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star, Umbrella, MapPin, CheckCircle2, Navigation, Share2, Check } from "lucide-react";
import PageContainer from "../components/layout/PageContainer";
import Loading from "../components/ui/Loading";
import ErrorMessage from "../components/ui/ErrorMessage";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import FormField, { inputClasses } from "../components/ui/FormField";
import { getPonto, getAvaliacoes, avaliarPonto } from "../services/pontoService";
import { tipoInfo } from "../lib/pontos";
import type { PontoDescanso, Avaliacao } from "../types/ponto";

export default function PontoDetalhe() {
  const { id } = useParams<{ id: string }>();
  const pontoId = Number(id);

  const [ponto, setPonto] = useState<PontoDescanso | null>(null);
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const [nota, setNota] = useState("5");
  const [notaHover, setNotaHover] = useState(0);
  const [comentario, setComentario] = useState("");
  const [erroForm, setErroForm] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [copiado, setCopiado] = useState(false);

  async function compartilhar() {
    const url = window.location.href;
    const titulo = ponto ? `Rota do Fôlego · ${ponto.nmPonto}` : "Rota do Fôlego";
    try {
      if (navigator.share) {
        await navigator.share({ title: titulo, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2500);
    } catch {
      /* usuário cancelou ou navegador sem suporte */
    }
  }

  function carregarAvaliacoes() {
    getAvaliacoes(pontoId)
      .then(setAvaliacoes)
      .catch(() => setAvaliacoes([]));
  }

  useEffect(() => {
    setCarregando(true);
    setErro("");
    getPonto(pontoId)
      .then((p) => {
        setPonto(p);
        carregarAvaliacoes();
      })
      .catch(() => setErro("Ponto não encontrado."))
      .finally(() => setCarregando(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pontoId]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErroForm("");
    setSucesso(false);
    const n = Number(nota);
    if (n < 1 || n > 5) {
      setErroForm("Escolha uma nota de 1 a 5.");
      return;
    }
    setEnviando(true);
    try {
      await avaliarPonto(pontoId, { nrNota: n, dsComentario: comentario });
      setSucesso(true);
      setComentario("");
      setNota("5");
      carregarAvaliacoes();
    } catch (err) {
      const motivo = err instanceof Error ? err.message : "";
      setErroForm(
        motivo
          ? `Não foi possível enviar a avaliação. ${motivo}`
          : "Não foi possível enviar a avaliação."
      );
    } finally {
      setEnviando(false);
    }
  }

  if (carregando) {
    return (
      <PageContainer className="py-16">
        <Loading texto="Carregando ponto..." />
      </PageContainer>
    );
  }

  if (erro || !ponto) {
    return (
      <PageContainer className="py-16">
        <ErrorMessage texto={erro || "Ponto não encontrado."} />
        <Link
          to="/pontos"
          className="mt-6 inline-flex items-center gap-2 font-bold text-folego-600 hover:text-folego-700"
        >
          <ArrowLeft className="h-4 w-4" /> Voltar para a lista
        </Link>
      </PageContainer>
    );
  }

  const info = tipoInfo[ponto.tipo] ?? tipoInfo.banco;

  // Destino do mapa: se o ponto tem coordenadas reais, usa-as; senão, cai no
  // endereço em texto (o Google Maps embute e traça rota a partir de texto, sem
  // precisar de coordenada nem de chave de API). Assim o mapa aparece inclusive
  // nos pontos cadastrados pelo app, que nascem sem lat/long.
  const temCoordenadas = ponto.latitude !== 0 && ponto.longitude !== 0;
  const enderecoBusca = [ponto.nmPonto, ponto.dsEndereco || ponto.bairro]
    .filter(Boolean)
    .join(", ");
  const destinoMapa = temCoordenadas
    ? `${ponto.latitude},${ponto.longitude}`
    : encodeURIComponent(enderecoBusca);
  const temMapa = temCoordenadas || enderecoBusca.length > 0;

  return (
    <div className="py-10 sm:py-14">
      <PageContainer size="narrow">
        <Link
          to="/pontos"
          className="inline-flex items-center gap-2 text-sm font-bold text-folego-600 hover:text-folego-700"
        >
          <ArrowLeft className="h-4 w-4" /> Voltar para os pontos
        </Link>

        {/* Cabeçalho do ponto */}
        <div className="mt-5 overflow-hidden rounded-3xl border border-folego-100 bg-white shadow-card">
          <div className="h-52 overflow-hidden bg-areia/40 sm:h-64">
            <img
              src={info.imagem}
              alt={`Ilustração representando um ponto do tipo ${info.label.toLowerCase()}`}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="p-6 sm:p-8">
            <Badge>
              <info.Icon className="h-3.5 w-3.5" aria-hidden />
              {info.label}
            </Badge>
            <h1 className="mt-3 text-3xl font-extrabold text-folego-700">{ponto.nmPonto}</h1>
            <p className="mt-2 flex items-center gap-1.5 text-grafite/70">
              <MapPin className="h-4 w-4 text-folego-500" aria-hidden />
              {ponto.bairro}
              {ponto.dsEndereco ? ` · ${ponto.dsEndereco}` : ""}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
              {ponto.notaMedia > 0 && (
                <span className="inline-flex items-center gap-1 font-bold text-amber-600">
                  <Star className="h-4 w-4 fill-amber-500 text-amber-500" aria-hidden />
                  {ponto.notaMedia.toFixed(1)}
                </span>
              )}
              <span className="inline-flex items-center gap-1 text-folego-600">
                <Umbrella className="h-4 w-4" aria-hidden />
                {ponto.coberto ? "Coberto" : "Sem cobertura"}
              </span>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${destinoMapa}&travelmode=walking`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-folego-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-folego-700"
              >
                <Navigation className="h-4 w-4" aria-hidden />
                Como chegar no Google Maps
              </a>
              <button
                type="button"
                onClick={compartilhar}
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-folego-600 px-5 py-3 text-sm font-semibold text-folego-700 transition hover:bg-folego-50"
              >
                {copiado ? (
                  <>
                    <Check className="h-4 w-4" aria-hidden />
                    Link copiado!
                  </>
                ) : (
                  <>
                    <Share2 className="h-4 w-4" aria-hidden />
                    Compartilhar
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mapa do local */}
        {temMapa && (
          <section className="mt-6 overflow-hidden rounded-3xl border border-folego-100 bg-white shadow-card">
            <h2 className="px-6 pt-5 text-base font-extrabold text-folego-700 sm:px-8">
              Onde fica
            </h2>
            <div className="mt-3 aspect-[16/10] w-full sm:aspect-[21/9]">
              <iframe
                title={`Mapa de ${ponto.nmPonto}`}
                src={`https://www.google.com/maps?q=${destinoMapa}&z=16&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full border-0"
              />
            </div>
          </section>
        )}

        {/* Avaliações */}
        <section className="mt-10">
          <h2 className="text-xl font-extrabold text-folego-700">Avaliações</h2>
          {avaliacoes.length === 0 ? (
            <p className="mt-2 text-sm text-grafite/60">
              Ainda não há avaliações. Seja a primeira pessoa a avaliar este ponto.
            </p>
          ) : (
            <ul className="mt-4 space-y-3">
              {avaliacoes.map((a) => (
                <li key={a.cdAvaliacao} className="rounded-2xl border border-folego-100 bg-white p-4">
                  <span className="text-amber-500" aria-label={`Nota ${a.nrNota} de 5`}>
                    {"★".repeat(a.nrNota)}
                    <span className="text-amber-500/30">{"★".repeat(5 - a.nrNota)}</span>
                  </span>
                  {a.dsComentario && (
                    <p className="mt-1.5 text-sm text-grafite/80">{a.dsComentario}</p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Formulário de avaliação */}
        <section className="mt-8 rounded-3xl border border-folego-100 bg-white p-6 shadow-card sm:p-8">
          <h2 className="text-xl font-extrabold text-folego-700">Avaliar este ponto</h2>

          {sucesso && (
            <div className="mt-4 flex items-start gap-2 rounded-xl border border-folego-100 bg-folego-50 px-4 py-3 text-sm font-medium text-folego-700">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
              Avaliação enviada com sucesso!
            </div>
          )}
          {erroForm && (
            <div className="mt-4">
              <ErrorMessage texto={erroForm} />
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-4">
            <FormField label="Nota" htmlFor="nota" required>
              <div
                role="radiogroup"
                aria-label="Nota de 1 a 5 estrelas"
                className="flex items-center gap-1"
                onMouseLeave={() => setNotaHover(0)}
              >
                {[1, 2, 3, 4, 5].map((n) => {
                  const ativa = n <= (notaHover || Number(nota));
                  return (
                    <button
                      key={n}
                      type="button"
                      role="radio"
                      aria-checked={Number(nota) === n}
                      aria-label={`${n} ${n === 1 ? "estrela" : "estrelas"}`}
                      onClick={() => setNota(String(n))}
                      onMouseEnter={() => setNotaHover(n)}
                      className="rounded-md p-1 transition hover:scale-110"
                    >
                      <Star
                        className={`h-8 w-8 transition ${
                          ativa ? "fill-amber-500 text-amber-500" : "fill-transparent text-grafite/25"
                        }`}
                        aria-hidden
                      />
                    </button>
                  );
                })}
                <span className="ml-2 text-sm font-bold text-grafite/70">{nota} de 5</span>
              </div>
            </FormField>

            <FormField label="Comentário" htmlFor="comentario" hint="Opcional">
              <textarea
                id="comentario"
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
                rows={3}
                className={inputClasses}
                placeholder="Como foi descansar aqui?"
              />
            </FormField>

            <Button type="submit" disabled={enviando}>
              {enviando ? "Enviando..." : "Enviar avaliação"}
            </Button>
          </form>
        </section>
      </PageContainer>
    </div>
  );
}
