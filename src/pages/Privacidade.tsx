import { ShieldCheck, Database, MapPin, Cookie, Lock, Eye, Heart, ArrowRight } from "lucide-react";
import PageContainer from "../components/layout/PageContainer";
import Reveal from "../components/ui/Reveal";
import Button from "../components/ui/Button";

const dados = [
  {
    icon: Heart,
    titulo: "Pontos salvos (favoritos)",
    texto:
      "Quando você salva um ponto de descanso, guardamos essa lista no armazenamento do seu próprio navegador (localStorage). Ela não é enviada para nenhum servidor e some se você limpar os dados do navegador.",
  },
  {
    icon: Eye,
    titulo: "Preferências de acessibilidade",
    texto:
      "Tamanho da fonte, modo de alto contraste e velocidade da leitura em voz alta ficam salvos no seu navegador para que o site lembre das suas escolhas na próxima visita.",
  },
  {
    icon: MapPin,
    titulo: "Localização",
    texto:
      "Só usamos a sua localização se você clicar em “Mais próximos de mim”, e apenas para calcular a distância até os pontos. O cálculo acontece no seu aparelho e a sua posição não é gravada nem compartilhada.",
  },
];

export default function Privacidade() {
  return (
    <div className="py-10 sm:py-14">
      <PageContainer size="narrow">
        {/* Cabeçalho */}
        <Reveal>
          <div className="flex items-center gap-2 text-folego-700">
            <ShieldCheck className="h-7 w-7" aria-hidden />
            <h1 className="text-3xl font-extrabold sm:text-4xl">Política de Privacidade</h1>
          </div>
          <p className="mt-2 text-grafite/80">
            Como o Rota do Fôlego trata os seus dados. Escrito em linguagem simples, em respeito à
            Lei Geral de Proteção de Dados (LGPD, a Lei nº 13.709/2018).
          </p>
          <p className="mt-1 text-xs font-bold uppercase tracking-wider text-folego-600">
            Atualizada em novembro de 2026
          </p>
        </Reveal>

        {/* Resumo honesto */}
        <Reveal delay={80}>
          <div className="mt-8 rounded-3xl border border-folego-100 bg-folego-50 p-6">
            <h2 className="flex items-center gap-2 text-lg font-extrabold text-folego-700">
              <Lock className="h-5 w-5" aria-hidden />
              Em resumo
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-grafite/80">
              <li>• Não pedimos cadastro, login, nome, e-mail nem telefone para usar o site.</li>
              <li>• Não usamos cookies de rastreamento, publicidade ou perfis de usuário.</li>
              <li>
                • Não temos ferramentas de terceiros espionando a sua navegação (sem Google
                Analytics, sem pixels de redes sociais).
              </li>
              <li>
                • O pouco que guardamos (favoritos e preferências) fica só no seu navegador, no seu
                aparelho.
              </li>
            </ul>
          </div>
        </Reveal>

        {/* O que guardamos */}
        <Reveal delay={120} className="mt-10">
          <h2 className="flex items-center gap-2 text-xl font-extrabold text-folego-700">
            <Database className="h-6 w-6" aria-hidden />O que o site guarda
          </h2>
          <div className="mt-4 space-y-3">
            {dados.map((d) => {
              const Icon = d.icon;
              return (
                <div
                  key={d.titulo}
                  className="flex gap-4 rounded-2xl border border-folego-100 bg-white p-5 shadow-card"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-folego-50 text-folego-600">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-bold text-folego-700">{d.titulo}</h3>
                    <p className="mt-1 text-sm text-grafite/80">{d.texto}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>

        {/* Cookies */}
        <Reveal delay={160} className="mt-10">
          <h2 className="flex items-center gap-2 text-xl font-extrabold text-folego-700">
            <Cookie className="h-6 w-6" aria-hidden />
            Cookies e armazenamento
          </h2>
          <p className="mt-3 text-sm text-grafite/80">
            O Rota do Fôlego usa apenas armazenamento <strong>necessário para funcionar</strong>: a
            tecnologia <em>localStorage</em> do navegador, que fica no seu aparelho e não é lida por
            servidores externos. Esse tipo de armazenamento guarda só as suas escolhas (favoritos e
            preferências de acessibilidade) e, pela LGPD, não exige consentimento porque não serve
            para rastrear ninguém. Mesmo assim, avisamos sobre ele na sua primeira visita.
          </p>
          <p className="mt-3 text-sm text-grafite/80">
            Você pode apagar tudo a qualquer momento limpando os dados do site nas configurações do
            seu navegador. O site continua funcionando normalmente. Ele só vai esquecer as suas
            preferências.
          </p>
        </Reveal>

        {/* Seus direitos */}
        <Reveal delay={200} className="mt-10">
          <h2 className="text-xl font-extrabold text-folego-700">Os seus direitos (LGPD)</h2>
          <p className="mt-3 text-sm text-grafite/80">
            A LGPD garante a você o direito de saber quais dados são usados, de corrigi-los e de
            apagá-los. Como o Rota do Fôlego não coleta dados pessoais em servidores e tudo fica no
            seu navegador, você já exerce esses direitos diretamente, limpando os dados do site
            quando quiser. Se tiver qualquer dúvida, fale com a equipe.
          </p>
        </Reveal>

        {/* Aviso projeto acadêmico */}
        <Reveal delay={240} className="mt-10">
          <div className="rounded-2xl border border-areia bg-offwhite p-5 text-sm text-grafite/80">
            <strong className="text-folego-700">Aviso.</strong> O Rota do Fôlego é um projeto
            acadêmico desenvolvido na Global Solution 2026/2 da FIAP (CitizenTech), com finalidade
            educacional. Quando o cadastro colaborativo de pontos passar a usar servidores reais,
            esta política será atualizada para descrever esse tratamento.
          </div>
        </Reveal>

        {/* CTA contato */}
        <Reveal delay={280} className="mt-10">
          <div className="flex flex-col items-start gap-3 rounded-2xl bg-folego-700 p-5 text-white sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-bold">Ficou com alguma dúvida sobre seus dados?</p>
            <Button to="/contato" variant="terracota" size="sm">
              Falar com a equipe
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
          </div>
        </Reveal>
      </PageContainer>
    </div>
  );
}
