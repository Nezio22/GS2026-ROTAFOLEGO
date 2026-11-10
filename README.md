# Rota do Fôlego · Front-End

Aplicação **SPA em React + Vite + TypeScript + Tailwind CSS** que planeja trajetos a pé
priorizando pontos de descanso (banco, sombra, marquise, bebedouro, banheiro acessível),
pensada para idosos, gestantes e pessoas com mobilidade reduzida.

Projeto da disciplina **Front-End Design Engineering** · Global Solution 2026/2 (CitizenTech · FIAP).

## Objetivo

A maioria dos apps de rota pensa no caminho mais curto. O Rota do Fôlego pensa em **onde dá
para descansar**. O usuário encontra pontos de descanso perto dele, monta um trajeto na ordem
que quiser e recebe a distância e o tempo estimados de caminhada leve, com link direto para a
rota a pé no Google Maps. É uma CitizenTech de mobilidade e acessibilidade urbana, conectada
aos ODS 3 (Saúde e bem-estar), 10 (Redução das desigualdades) e 11 (Cidades e comunidades
sustentáveis).

## Tecnologias

- React + Vite + TypeScript
- Tailwind CSS
- react-router-dom (rotas estáticas e dinâmicas)
- **Fetch API** para as requisições HTTP (sem Axios, conforme a disciplina)
- lucide-react (ícones)

## Funcionalidades

- **Pontos de descanso:** busca por nome, bairro ou endereço, filtro por tipo e cadastro de
  novos pontos (formulário com validação, estados de carregamento e mensagens claras).
- **Detalhe do ponto:** avaliações e envio de nova avaliação (rota dinâmica `/ponto/:id`).
- **Planejar trajeto:** seleção de paradas com reordenação (arrastar), cálculo de
  **distância e tempo estimados a partir das coordenadas reais** e geração da rota a pé
  no Google Maps.
- **Páginas institucionais:** Home, Sobre, Integrantes, FAQ e Contato.
- **Estados tratados** em toda a aplicação: carregando, erro, lista vazia e sucesso.
- **Dropdown customizado** com a identidade visual do projeto (sem o `<select>` nativo).

## Estrutura de pastas

```
src/
  components/
    layout/    -> Navbar, Footer, PageContainer
    ui/        -> Button, Select, SectionHeading, Badge, FormField,
                  Loading, ErrorMessage, EmptyState, Reveal
    pontos/    -> PontoCard, PontoFilters, PontoForm
    trajeto/   -> TrajetoPointItem, TrajetoSummary
  pages/       -> Home, Sobre, Integrantes, IntegranteDetalhe, Faq, Contato,
                  Pontos, PontoDetalhe, PlanejarTrajeto, NotFound
  services/    -> api.ts (config + helper Fetch), pontoService.ts (pontos)
  lib/         -> pontos.ts (tipos e ícones), trajeto.ts (distância/tempo)
  data/        -> mockPontos.ts, integrantes.ts (dados de exemplo)
  types/       -> ponto.ts, integrante.ts
```

A arquitetura separa **componentes, páginas, serviços e tipos** em arquivos próprios, com
tipagem aplicada a props, estados e dados principais.

## Como executar

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

## Rotas

| Rota | Página | Tipo |
|------|--------|------|
| `/` | Home | estática |
| `/sobre` | Sobre | estática |
| `/integrantes` | Integrantes | estática |
| `/integrante/:rm` | Detalhe do integrante | **dinâmica** |
| `/faq` | FAQ | estática |
| `/contato` | Contato (formulário com validação) | estática |
| `/pontos` | Lista + cadastro de pontos (GET + POST) | estática |
| `/ponto/:id` | Detalhe + avaliações (GET + POST) | **dinâmica** |
| `/planejar` | Planejar trajeto | estática |

## Integração com a API Java

> **Estado atual:** o app está em **modo mock** (`USE_MOCK = true`), com os dados guardados
> no navegador (localStorage), para desenvolver e testar sem depender da API. Isto **ainda
> não é a integração final exigida** pela disciplina. Quando a API REST da disciplina de
> Domain Driven Design Using Java estiver publicada no Render, a aplicação passará a consumir
> os dados reais e esta seção será atualizada para descrever a integração ativa.

Para ligar a API real, em `src/services/api.ts`:

1. troque `const USE_MOCK = true;` para `false`;
2. ajuste `BASE_URL` para a URL pública da API no Render.

As funções com Fetch, a camada de serviços (`services/`) e a tipagem das respostas
(`types/`) já estão prontas, com tratamento de carregamento, erro e ausência de dados.
Operações usadas: **GET** (listar pontos e avaliações) e **POST** (cadastrar ponto e enviar
avaliação).

## Responsividade e acessibilidade

- **Responsivo** nas resoluções avaliadas: mobile 390x844, tablet 768x1024 e desktop 1440x900,
  sem rolagem horizontal indevida, cortes ou sobreposições.
- **Navegação por teclado** nos menus, no accordion do FAQ e no dropdown customizado.
- `aria-*` nos componentes interativos (`aria-expanded`, `aria-pressed`, `aria-label`,
  `role="alert"`), foco visível e `alt` descritivo nas imagens informativas.
- Suporte a `prefers-reduced-motion` (desliga as animações de entrada).
- Fonte **Nunito** e bom contraste, pensando no público idoso.

## Integrantes

| Nome | RM | Frente | GitHub |
|------|----|--------|--------|
| Matheus Faria Nezio | 571702 | Front-End Design Engineering | https://github.com/Nezio22 |
| Júlia Rodrigues de Oliveira Almeida | 571244 | Banco Oracle + API Java (DDD) | https://github.com/juliaraalmeida77-ux |
| Alexandre Prazeres dos Santos | 573059 | IA + Python + Software Engineering | https://github.com/U-Ale |

## Links

- **Repositório (GitHub):** https://github.com/Nezio22/GS2026-ROTAFOLEGO
- **Deploy (Vercel):** _a adicionar após o deploy_
- **API (Render):** _a adicionar quando a API Java estiver no ar_
- **Vídeo (YouTube):** _a adicionar_

## Contato

Dúvidas sobre o projeto podem ser direcionadas à equipe pelos perfis de GitHub acima ou pela
página **Contato** da própria aplicação.

## Uso de IA

Durante o desenvolvimento, a equipe utilizou ferramentas de IA (assistentes de código) como
apoio para:

- gerar e revisar trechos de código React, TypeScript e Tailwind;
- sugerir a estrutura de componentes e a organização de pastas;
- revisar acessibilidade e responsividade;
- apoiar a escrita desta documentação.

Todo o código gerado foi **lido, testado e ajustado pela equipe** antes de ser incorporado.
As decisões de design, a identidade visual e as regras de negócio foram definidas pelos
integrantes. Nenhum dado foi inventado: distância e tempo no trajeto são calculados a partir
de coordenadas reais, e o formulário de contato informa que ainda não há envio a um servidor.
