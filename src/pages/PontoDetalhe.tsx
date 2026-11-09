import { useEffect, useState, type FormEvent } from "react";
import { useParams, Link } from "react-router-dom";
import { getPonto, getAvaliacoes, avaliarPonto } from "../services/api";
import type { PontoDescanso, Avaliacao } from "../types/ponto";
import Card from "../components/Card";
import Button from "../components/Button";
import FormField from "../components/FormField";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import TipoBadge from "../components/TipoBadge";

// Rota dinâmica: /ponto/:id
export default function PontoDetalhe() {
  const { id } = useParams<{ id: string }>();
  const pontoId = Number(id);

  const [ponto, setPonto] = useState<PontoDescanso | null>(null);
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  // Formulário de avaliação (POST)
  const [nota, setNota] = useState("5");
  const [comentario, setComentario] = useState("");
  const [erroForm, setErroForm] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [enviando, setEnviando] = useState(false);

  function carregarAvaliacoes() {
    getAvaliacoes(pontoId).then(setAvaliacoes).catch(() => setAvaliacoes([]));
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
    setSucesso("");
    const n = Number(nota);
    if (n < 1 || n > 5) {
      setErroForm("A nota deve ser de 1 a 5.");
      return;
    }
    setEnviando(true);
    try {
      await avaliarPonto(pontoId, { nrNota: n, dsComentario: comentario });
      setSucesso("Avaliação enviada com sucesso!");
      setComentario("");
      setNota("5");
      carregarAvaliacoes();
    } catch {
      setErroForm("Falha ao enviar a avaliação.");
    } finally {
      setEnviando(false);
    }
  }

  const inputClasse =
    "rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-folego-500 focus:outline-none focus:ring-2 focus:ring-folego-500/40";

  if (carregando) return <Loading texto="Carregando ponto..." />;
  if (erro || !ponto)
    return (
      <div className="space-y-4">
        <ErrorMessage texto={erro || "Ponto não encontrado."} />
        <Link to="/pontos" className="text-folego-600 hover:underline">
          ← Voltar para a lista
        </Link>
      </div>
    );

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <Link to="/pontos" className="text-sm text-folego-600 hover:underline">
        ← Voltar para a lista
      </Link>

      <Card>
        <div className="flex items-start justify-between gap-2">
          <h1 className="text-2xl font-bold text-slate-800">{ponto.nmPonto}</h1>
          <TipoBadge tipo={ponto.tipo} />
        </div>
        <p className="mt-1 text-slate-500">{ponto.bairro}</p>
        <p className="mt-2 text-slate-600">{ponto.dsEndereco}</p>
        <div className="mt-3 flex gap-4 text-sm text-slate-600">
          <span className="text-amber-600">★ {ponto.notaMedia.toFixed(1)}</span>
          <span>{ponto.coberto ? "Coberto" : "Sem cobertura"}</span>
        </div>
      </Card>

      {/* Avaliações (GET) */}
      <section>
        <h2 className="text-xl font-bold text-folego-900">Avaliações</h2>
        {avaliacoes.length === 0 ? (
          <p className="mt-2 text-sm text-slate-500">
            Ainda não há avaliações. Seja o primeiro a avaliar.
          </p>
        ) : (
          <ul className="mt-3 space-y-3">
            {avaliacoes.map((a) => (
              <li
                key={a.cdAvaliacao}
                className="rounded-lg border border-slate-200 bg-white px-4 py-3"
              >
                <span className="text-amber-600">{"★".repeat(a.nrNota)}</span>
                {a.dsComentario && (
                  <p className="mt-1 text-sm text-slate-600">{a.dsComentario}</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Avaliar (POST) */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-xl font-bold text-folego-900">Avaliar este ponto</h2>

        {erroForm && (
          <div className="mt-4 rounded-lg border border-rose-200 bg-rose-50 px-4 py-2 text-sm text-rose-700">
            {erroForm}
          </div>
        )}
        {sucesso && (
          <div className="mt-4 rounded-lg border border-folego-100 bg-folego-50 px-4 py-2 text-sm text-folego-800">
            {sucesso}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-4 space-y-4" noValidate>
          <FormField label="Nota (1 a 5)" htmlFor="nota">
            <select
              id="nota"
              value={nota}
              onChange={(e) => setNota(e.target.value)}
              className={inputClasse}
            >
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>
                  {n} {"★".repeat(n)}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="Comentário (opcional)" htmlFor="comentario">
            <textarea
              id="comentario"
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              rows={3}
              className={inputClasse}
              placeholder="Como foi descansar aqui?"
            />
          </FormField>

          <Button type="submit" disabled={enviando}>
            {enviando ? "Enviando..." : "Enviar avaliação"}
          </Button>
        </form>
      </section>
    </div>
  );
}
