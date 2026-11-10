import { useState, type FormEvent } from "react";
import { Mail, Info, Send } from "lucide-react";
import PageContainer from "../components/layout/PageContainer";
import Reveal from "../components/ui/Reveal";
import Button from "../components/ui/Button";
import FormField, { inputClasses } from "../components/ui/FormField";

interface Erros {
  nome?: string;
  email?: string;
  mensagem?: string;
}

export default function Contato() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [erros, setErros] = useState<Erros>({});
  const [enviando, setEnviando] = useState(false);
  const [info, setInfo] = useState(false);

  function validar(): boolean {
    const novos: Erros = {};
    if (nome.trim().length < 3) novos.nome = "Informe seu nome completo.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) novos.email = "Informe um e-mail válido.";
    if (mensagem.trim().length < 10)
      novos.mensagem = "A mensagem deve ter pelo menos 10 caracteres.";
    setErros(novos);
    return Object.keys(novos).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setInfo(false);
    if (!validar()) return;
    setEnviando(true);
    // Não há back-end de contato: validamos os dados e informamos a situação com honestidade.
    await new Promise((r) => setTimeout(r, 600));
    setEnviando(false);
    setInfo(true);
  }

  return (
    <div className="py-10 sm:py-14">
      <PageContainer className="grid gap-10 lg:grid-cols-2 lg:items-center">
        {/* Esquerda */}
        <Reveal>
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-folego-500">
            Contato
          </p>
          <h1 className="mt-3 text-3xl font-extrabold text-folego-700 sm:text-4xl">
            Estamos aqui para ouvir você.
          </h1>
          <p className="mt-4 text-grafite/80">
            Tem alguma dúvida, sugestão ou ideia para tornar a cidade mais acessível? Entre em
            contato com nossa equipe.
          </p>
          <div className="mt-6 overflow-hidden rounded-3xl bg-areia/30">
            <img
              src="/images/07_Contato/parque_banco_poste.png"
              alt="Ilustração de um parque com banco e poste de iluminação"
              loading="lazy"
              className="max-h-80 w-full object-contain"
            />
          </div>
        </Reveal>

        {/* Direita — formulário */}
        <Reveal delay={100}>
          <div className="rounded-3xl border border-folego-100 bg-white p-6 shadow-card sm:p-8">
            <div className="flex items-center gap-2 text-folego-700">
              <Mail className="h-5 w-5" aria-hidden />
              <h2 className="text-lg font-extrabold">Envie uma mensagem</h2>
            </div>

            {info && (
              <div className="mt-4 flex items-start gap-2 rounded-xl bg-folego-50 px-4 py-3 text-sm text-folego-700">
                <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                <span>
                  Seus dados foram validados. O envio ainda não está conectado a um servidor —
                  esta interface está preparada para a integração futura, então nada foi enviado.
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-4">
              <FormField label="Nome" htmlFor="nome" required error={erros.nome}>
                <input
                  id="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className={inputClasses}
                  placeholder="Seu nome"
                />
              </FormField>

              <FormField label="E-mail" htmlFor="email" required error={erros.email}>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClasses}
                  placeholder="voce@email.com"
                />
              </FormField>

              <FormField label="Mensagem" htmlFor="mensagem" required error={erros.mensagem}>
                <textarea
                  id="mensagem"
                  value={mensagem}
                  onChange={(e) => setMensagem(e.target.value)}
                  rows={4}
                  className={inputClasses}
                  placeholder="Escreva sua mensagem..."
                />
              </FormField>

              <Button type="submit" disabled={enviando} fullWidth>
                {enviando ? (
                  "Processando..."
                ) : (
                  <>
                    <Send className="h-4 w-4" aria-hidden />
                    Enviar mensagem
                  </>
                )}
              </Button>
            </form>
          </div>
        </Reveal>
      </PageContainer>
    </div>
  );
}
