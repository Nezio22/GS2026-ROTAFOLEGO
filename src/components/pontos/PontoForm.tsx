import { forwardRef, useState, type FormEvent } from "react";
import { Info, CheckCircle2 } from "lucide-react";
import type { NovoPonto, TipoPonto } from "../../types/ponto";
import { TIPOS, tipoInfo } from "../../lib/pontos";
import { criarPonto } from "../../services/pontoService";
import { USE_MOCK } from "../../services/api";
import FormField, { inputClasses } from "../ui/FormField";
import Select from "../ui/Select";
import Button from "../ui/Button";
import ErrorMessage from "../ui/ErrorMessage";

interface PontoFormProps {
  onCreated: () => void;
}

const PontoForm = forwardRef<HTMLDivElement, PontoFormProps>(function PontoForm(
  { onCreated },
  ref
) {
  const [nmPonto, setNmPonto] = useState("");
  const [bairro, setBairro] = useState("");
  const [dsEndereco, setDsEndereco] = useState("");
  const [tipo, setTipo] = useState<TipoPonto>("banco");
  const [coberto, setCoberto] = useState(false);

  const [erros, setErros] = useState<{ nmPonto?: string; bairro?: string }>({});
  const [erroEnvio, setErroEnvio] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const [enviando, setEnviando] = useState(false);

  function validar(): boolean {
    const novos: typeof erros = {};
    if (nmPonto.trim().length < 3) novos.nmPonto = "Informe um nome com ao menos 3 letras.";
    if (bairro.trim().length < 2) novos.bairro = "Informe o bairro.";
    setErros(novos);
    return Object.keys(novos).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErroEnvio("");
    setSucesso(false);
    if (!validar()) return;

    const dados: NovoPonto = { nmPonto, bairro, dsEndereco, tipo, coberto };
    setEnviando(true);
    try {
      await criarPonto(dados);
      setSucesso(true);
      setNmPonto("");
      setBairro("");
      setDsEndereco("");
      setTipo("banco");
      setCoberto(false);
      onCreated();
    } catch (e) {
      const motivo = e instanceof Error ? e.message : "";
      setErroEnvio(
        motivo
          ? `Não foi possível cadastrar o ponto. ${motivo}`
          : "Não foi possível cadastrar o ponto. Tente novamente."
      );
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div ref={ref} className="rounded-3xl border border-folego-100 bg-white p-6 shadow-card sm:p-8">
      <h2 className="text-2xl font-extrabold text-folego-700">Cadastrar um ponto</h2>
      <p className="mt-1 text-sm text-grafite/70">
        Conhece um bom lugar para descansar? Ajude outras pessoas adicionando-o aqui.
      </p>

      {USE_MOCK && (
        <div className="mt-4 flex items-start gap-2 rounded-xl bg-folego-50 px-4 py-3 text-sm text-folego-700">
          <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          <span>
            Modo demonstração: enquanto a API Java não está conectada, o ponto fica salvo
            neste navegador.
          </span>
        </div>
      )}

      {sucesso && (
        <div className="mt-4 flex items-start gap-2 rounded-xl border border-folego-100 bg-folego-50 px-4 py-3 text-sm font-medium text-folego-700">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          Ponto cadastrado com sucesso!
        </div>
      )}
      {erroEnvio && (
        <div className="mt-4">
          <ErrorMessage texto={erroEnvio} />
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField label="Nome do ponto" htmlFor="nmPonto" required error={erros.nmPonto}>
          <input
            id="nmPonto"
            value={nmPonto}
            onChange={(e) => setNmPonto(e.target.value)}
            className={inputClasses}
            placeholder="Ex.: Banco da praça central"
          />
        </FormField>

        <FormField label="Bairro" htmlFor="bairro" required error={erros.bairro}>
          <input
            id="bairro"
            value={bairro}
            onChange={(e) => setBairro(e.target.value)}
            className={inputClasses}
            placeholder="Ex.: Centro"
          />
        </FormField>

        <FormField label="Endereço" htmlFor="dsEndereco" hint="Opcional">
          <input
            id="dsEndereco"
            value={dsEndereco}
            onChange={(e) => setDsEndereco(e.target.value)}
            className={inputClasses}
            placeholder="Rua, número ou referência"
          />
        </FormField>

        <FormField label="Tipo de ponto" htmlFor="tipo">
          <Select
            value={tipo}
            onChange={(v) => setTipo(v as TipoPonto)}
            ariaLabel="Tipo de ponto"
            options={TIPOS.map((t) => ({ value: t, label: tipoInfo[t].label }))}
          />
        </FormField>

        <label className="flex items-center gap-2.5 text-sm font-medium text-grafite sm:col-span-2">
          <input
            type="checkbox"
            checked={coberto}
            onChange={(e) => setCoberto(e.target.checked)}
            className="h-4 w-4 rounded border-folego-300 text-folego-600 focus:ring-folego-500"
          />
          Possui cobertura (protege do sol e da chuva)
        </label>

        <div className="sm:col-span-2">
          <Button type="submit" disabled={enviando}>
            {enviando ? "Salvando..." : "Cadastrar ponto"}
          </Button>
        </div>
      </form>
    </div>
  );
});

export default PontoForm;
