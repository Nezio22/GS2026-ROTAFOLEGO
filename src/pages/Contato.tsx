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
    // Não há back-end de contato: validamos e informamos a situação com honestidade.
    await new Promise((r) => setTimeout(r, 600));
    setEnviando(false);
    setInfo(true);
  }

  return (
    <section className="relative overflow-hidden">
      <img
        src="/images/00_Identidade_Visual/padrao_organico.png"
        alt=""
        aria-hidden
        className="pointer-events-none absolute -left-16 bottom-10 hidden w-64 opacity-10 lg:block"
      />

      <PageContainer className="relative py-10 lg:py-16">
        <div className="lg:max-w-[55%]">
          <Reveal>
            <div className="flex items-center gap-2 text-folego-700">
              <Mail className="h-7 w-7" aria-hidden />
              <h1 className="text-3xl font-extrabold sm:text-4xl">Contato</h1>
            </div>
            <p className="mt-2 text-grafite/80">Fale com a equipe do Rota do Fôlego.</p>
          </Reveal>

          {info && (
            <div className="mt-6 flex items-start gap-2 rounded-xl bg-folego-50 px-4 py-3 text-sm text-folego-700">
              <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
              <span>
                Seus dados foram validados. O envio ainda não está conectado a um servidor.
                Esta interface está preparada para a integração futura, então nada foi enviado.
              </span>
            </div>
          )}

          <Reveal delay={80}>
            <form onSubmit={handleSubmit} noValidate className="mt-6 max-w-xl space-y-5">
              <FormField label="Nome" htmlFor="nome" error={erros.nome}>
                <input
                  id="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className={inputClasses}
                  placeholder="Seu nome"
                />
              </FormField>

              <FormField label="E-mail" htmlFor="email" error={erros.email}>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClasses}
                  placeholder="voce@email.com"
                />
              </FormField>

              <FormField label="Mensagem" htmlFor="mensagem" error={erros.mensagem}>
                <textarea
                  id="mensagem"
                  value={mensagem}
                  onChange={(e) => setMensagem(e.target.value)}
                  rows={5}
                  className={inputClasses}
                  placeholder="Escreva sua mensagem..."
                />
              </FormField>

              <Button type="submit" disabled={enviando}>
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
          </Reveal>
        </div>
      </PageContainer>

      {/* Ilustração — bloco no celular, altura cheia à direita no desktop */}
      <div className="px-4 pb-10 lg:absolute lg:inset-y-0 lg:right-0 lg:w-[40%] lg:px-0 lg:pb-0">
        <img
          src="/images/07_Contato/parque_banco_poste.png"
          alt="Ilustração de um parque com banco e poste de iluminação"
          loading="lazy"
          className="h-56 w-full rounded-3xl object-cover sm:h-72 lg:h-full lg:rounded-none"
        />
        <div
          className="absolute inset-y-0 left-0 hidden w-32 bg-gradient-to-r from-offwhite to-transparent lg:block"
          aria-hidden
        />
      </div>
    </section>
  );
}
