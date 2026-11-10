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

## Integrantes

| Nome | Frente |
|------|--------|
| Matheus Nezio | Front-End |
| Julia Almeida | Banco Oracle + API Java |
| Alexandre Prazeres | IA + Python + Documentação |

## Links

- GitHub: _adicionar_
- Vercel: _adicionar_
- API (Render): _adicionar_
- Vídeo (YouTube): _adicionar_

## Uso de IA

_Preencher: ferramentas usadas, para quê, e o que foi revisado pela equipe._
