# Rota do Fôlego — Front-End

Aplicação **SPA em React + Vite + TypeScript + Tailwind CSS** que planeja trajetos a pé
priorizando pontos de descanso (banco, sombra, marquise, bebedouro, banheiro acessível),
pensada para idosos, gestantes e pessoas com mobilidade reduzida.

Projeto da disciplina **Front-End Design Engineering** — Global Solution 2026/2 (CitizenTech · FIAP).

## Tecnologias

- React + Vite + TypeScript
- Tailwind CSS
- react-router-dom
- **Fetch API** para as requisições (sem Axios)
- lucide-react (ícones)

## Funcionalidades

- **Pontos de descanso:** busca por nome/bairro/endereço, filtro por tipo e cadastro de
  novos pontos (formulário com validação).
- **Detalhe do ponto:** avaliações e envio de nova avaliação (rota dinâmica `/ponto/:id`).
- **Planejar trajeto:** seleção de paradas com reordenação (arrastar), cálculo de
  **distância e tempo estimados a partir das coordenadas reais** e geração da rota a pé
  no Google Maps.
- **Páginas institucionais:** Home, Sobre, Integrantes, FAQ e Contato.
- **Estados tratados** em toda a aplicação: carregando, erro, lista vazia e sucesso.
- **Dropdown customizado** com a identidade visual (sem o `<select>` nativo).

## Como rodar

```bash
npm install
npm run dev
```

Abra o endereço que o Vite mostrar (geralmente `http://localhost:5173`).

Para gerar a versão de produção:

```bash
npm run build
npm run preview
```

## Estrutura de pastas

```
src/
  components/
    layout/    → Navbar, Footer, PageContainer
    ui/        → Button, Select, SectionHeading, Badge, FormField,
                 Loading, ErrorMessage, EmptyState, Reveal
    pontos/    → PontoCard, PontoFilters, PontoForm
    trajeto/   → TrajetoPointItem, TrajetoSummary
  pages/       → Home, Sobre, Integrantes, IntegranteDetalhe, Faq, Contato,
                 Pontos, PontoDetalhe, PlanejarTrajeto, NotFound
  services/    → api.ts (config + helper Fetch), pontoService.ts (pontos)
  lib/         → pontos.ts (tipos e ícones), trajeto.ts (distância/tempo)
  data/        → mockPontos.ts, integrantes.ts (dados de exemplo)
  types/       → ponto.ts, integrante.ts
```

## Integração com a API Java

Enquanto a API Java (disciplina DDD) não está publicada, o app usa **dados mockados**
guardados no navegador (localStorage), para você já desenvolver e testar tudo.

Quando a API estiver no ar, em `src/services/api.ts`:

1. troque `const USE_MOCK = true;` para `false`;
2. ajuste `BASE_URL` para a URL da API no Render.

As funções com Fetch já estão escritas — nada mais precisa mudar nas páginas.

## Rotas

| Rota | Página |
|------|--------|
| `/` | Home |
| `/sobre` | Sobre |
| `/integrantes` | Integrantes |
| `/integrante/:rm` | Detalhe do integrante (rota dinâmica) |
| `/faq` | FAQ |
| `/contato` | Contato (formulário com validação) |
| `/pontos` | Lista + cadastro de pontos (GET + POST) |
| `/ponto/:id` | Detalhe + avaliações (rota dinâmica, GET + POST) |
| `/planejar` | Planejar trajeto |

## Acessibilidade e responsividade

- **Responsivo** para celular, tablet e desktop (sem rolagem horizontal).
- **Navegação por teclado** nos menus, no accordion do FAQ e no dropdown customizado.
- `aria-*` nos componentes interativos (`aria-expanded`, `aria-pressed`, `aria-label`,
  `role="alert"`), foco visível e `alt` descritivo nas imagens informativas.
- Suporte a `prefers-reduced-motion` (desliga as animações de entrada).
- Fonte **Nunito** e bom contraste, pensando no público idoso.

## Integrantes

| Nome | RM | Frente | GitHub |
|------|----|--------|--------|
| Matheus Faria Nezio | 571702 | Front-End Design Engineering | https://github.com/Nezio22 |
| Júlia Rodrigues de Oliveira Almeida | 571244 | Banco Oracle + API Java | https://github.com/juliaraalmeida77-ux |
| Alexandre Prazeres dos Santos | 573059 | IA + Python + Software Engineering | https://github.com/U-Ale |

## Links

- Repositório: https://github.com/Nezio22/GS2026-ROTAFOLEGO
- Vercel: _adicionar após o deploy_
- API (Render): _adicionar quando a API Java estiver no ar_
- Vídeo (YouTube): _adicionar_

## Uso de IA

Durante o desenvolvimento, a equipe utilizou ferramentas de IA (assistentes de código)
como apoio para:

- gerar e revisar trechos de código React / TypeScript / Tailwind;
- sugerir a estrutura de componentes e a organização de pastas;
- revisar acessibilidade e responsividade;
- apoiar a escrita desta documentação.

Todo o código gerado foi **lido, testado e ajustado pela equipe** antes de ser incorporado.
As decisões de design, a identidade visual e as regras de negócio foram definidas pelos
integrantes. Nenhum dado foi inventado: distância e tempo no trajeto são calculados a partir
de coordenadas reais, e o formulário de contato informa que ainda não há envio a um servidor.
