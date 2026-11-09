import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { getPontos, criarPonto } from "../services/api";
import type { PontoDescanso, TipoPonto, NovoPonto } from "../types/ponto";
import Card from "../components/Card";
import Button from "../components/Button";
import FormField from "../components/FormField";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import TipoBadge from "../components/TipoBadge";

const tipos: TipoPonto[] = ["banco", "sombra", "marquise", "bebedouro", "banheiro"];

export default function Pontos() {
  const [pontos, setPontos] = useState<PontoDescanso[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  // Formulário de cadastro (POST)
  const [nmPonto, setNmPonto] = useState("");
  const [dsEndereco, setDsEndereco] = useState("");
  const [bairro, setBairro] = useState("");
  const [tipo, setTipo] = useState<TipoPonto>("banco");
  const [coberto, setCoberto] = useState(false);
  const [erroForm, setErroForm] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [salvando, setSalvando] = useState(false);

  function carregar() {
    setCarregando(true);
    setErro("");
    getPontos()
      .then(setPontos)
      .catch(() => setErro("Não foi possível carregar os pontos."))
      .finally(() => setCarregando(false));
  }

  useEffect(() => {
    carregar();
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErroForm("");
    setSucesso("");
    if (nmPonto.trim().length < 3 || bairro.trim().length < 2) {
      setErroForm("Preencha ao menos o nome (3+ letras) e o bairro.");
      return;
    }
    const novo: NovoPonto = { nmPonto, dsEndereco, bairro, tipo, coberto };
    setSalvando(true);
    try {
      await criarPonto(novo);
      setSucesso("Ponto cadastrado com sucesso!");
      setNmPonto("");
      setDsEndereco("");
      setBairro("");
      setTipo("banco");
      setCoberto(false);
      carregar();
    } catch {
      setErroForm("Falha ao cadastrar o ponto. Tente novamente.");
    } finally {
      setSalvando(false);
    }
  }

  const inputClasse =
    "rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-folego-500 focus:outline-none focus:ring-2 focus:ring-folego-500/40";

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-3xl font-bold text-folego-900">Pontos de descanso</h1>
        <p className="mt-2 text-slate-600">
          Veja os pontos cadastrados pela comunidade e adicione os que você conhece.
        </p>
      </header>

      {/* Lista (GET) */}
      <section>
        {carregando && <Loading texto="Carregando pontos..." />}
        {!carregando && erro && <ErrorMessage texto={erro} />}
        {!carregando && !erro && pontos.length === 0 && (
          <p className="text-slate-500">Nenhum ponto cadastrado ainda.</p>
        )}
        {!carregando && !erro && pontos.length > 0 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {pontos.map((p) => (
              <Card key={p.cdPonto}>
                <div className="flex items-start justify-between gap-2">
                  <h2 className="font-semibold text-slate-800">{p.nmPonto}</h2>
                  <TipoBadge tipo={p.tipo} />
                </div>
                <p className="mt-1 text-sm text-slate-500">{p.bairro}</p>
                <p className="mt-2 text-sm text-slate-600">{p.dsEndereco}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm text-amber-600">
                    ★ {p.notaMedia.toFixed(1)}
                  </span>
                  <Link
                    to={`/ponto/${p.cdPonto}`}
                    className="text-sm font-medium text-folego-600 hover:underline"
                  >
                    Detalhes →
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Formulário (POST) */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-xl font-bold text-folego-900">Cadastrar novo ponto</h2>

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

        <form onSubmit={handleSubmit} className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2" noValidate>
          <FormField label="Nome do ponto" htmlFor="nmPonto">
            <input
              id="nmPonto"
              value={nmPonto}
              onChange={(e) => setNmPonto(e.target.value)}
              className={inputClasse}
              placeholder="Ex.: Banco da praça"
            />
          </FormField>

          <FormField label="Bairro" htmlFor="bairro">
            <input
              id="bairro"
              value={bairro}
              onChange={(e) => setBairro(e.target.value)}
              className={inputClasse}
              placeholder="Ex.: Centro"
            />
          </FormField>

          <FormField label="Endereço" htmlFor="dsEndereco">
            <input
              id="dsEndereco"
              value={dsEndereco}
              onChange={(e) => setDsEndereco(e.target.value)}
              className={inputClasse}
              placeholder="Rua, número"
            />
          </FormField>

          <FormField label="Tipo" htmlFor="tipo">
            <select
              id="tipo"
              value={tipo}
              onChange={(e) => setTipo(e.target.value as TipoPonto)}
              className={inputClasse}
            >
              {tipos.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </FormField>

          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={coberto}
              onChange={(e) => setCoberto(e.target.checked)}
              className="h-4 w-4"
            />
            É coberto (protege do sol/chuva)
          </label>

          <div className="sm:col-span-2">
            <Button type="submit" disabled={salvando}>
              {salvando ? "Salvando..." : "Cadastrar ponto"}
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
}
