import type {
  PontoDescanso,
  Avaliacao,
  NovoPonto,
  NovaAvaliacao,
} from "../types/ponto";
import { USE_MOCK, apiFetch, delay } from "./api";
import { mockPontos } from "../data/mockPontos";

// ---- Adapter da API Java (Julia) -----------------------------------------
// O back-end devolve os campos no padrão do banco Oracle (vl_latitude,
// vl_longitude e SEM bairro próprio — ele vem embutido em ds_endereco).
// As telas, porém, usam latitude/longitude/bairro. Este adapter traduz o
// JSON cru da API para o tipo PontoDescanso, isolando a diferença num só
// lugar (a borda). Assim as telas não precisam saber dos nomes do banco.

/** Formato exato que a API Java retorna em GET /pontos. */
interface PontoApi {
  cdPonto: number;
  nmPonto: string;
  dsEndereco: string;
  vlLatitude: number | null;
  vlLongitude: number | null;
  coberto: boolean;
  dtCadastro?: string;
  cdTipo?: number;
  tipo: string;
  notaMedia: number;
}

/**
 * Extrai o bairro do endereço. O padrão cadastrado é
 * "Local - Bairro, Cidade" (ex.: "Praca da Republica - Republica, Sao Paulo").
 * Se o padrão não bater, devolve o melhor palpite sem quebrar.
 */
function extrairBairro(endereco: string): string {
  if (!endereco) return "";
  const posTraco = endereco.indexOf(" - ");
  let resto = posTraco >= 0 ? endereco.slice(posTraco + 3) : endereco;
  const posVirgula = resto.indexOf(",");
  if (posVirgula >= 0) resto = resto.slice(0, posVirgula);
  return resto.trim();
}

/**
 * Normaliza o tipo da API para uma das chaves que o front conhece
 * ("banco" | "sombra" | "marquise" | "bebedouro" | "banheiro").
 * A API usa, por ex., "banheiro acessivel" — aqui isso vira "banheiro".
 * Se vier algo desconhecido, cai em "banco" para nunca quebrar a tela.
 */
function mapearTipo(texto: string): PontoDescanso["tipo"] {
  const t = (texto ?? "").toLowerCase();
  if (t.startsWith("banheiro")) return "banheiro";
  if (t.startsWith("sombra")) return "sombra";
  if (t.startsWith("marquise")) return "marquise";
  if (t.startsWith("bebedouro")) return "bebedouro";
  return "banco";
}

/**
 * Caminho inverso do mapearTipo: a chave do front vira o cd_tipo que a API
 * espera no POST. A ordem bate com o banco (1=banco ... 5=banheiro acessivel).
 */
const TIPO_PARA_CODIGO: Record<PontoDescanso["tipo"], number> = {
  banco: 1,
  sombra: 2,
  marquise: 3,
  bebedouro: 4,
  banheiro: 5,
};

/** Converte um ponto da API para o tipo que as telas consomem. */
function mapearPonto(api: PontoApi): PontoDescanso {
  return {
    cdPonto: api.cdPonto,
    nmPonto: api.nmPonto,
    dsEndereco: api.dsEndereco,
    bairro: extrairBairro(api.dsEndereco),
    tipo: mapearTipo(api.tipo),
    coberto: api.coberto,
    notaMedia: api.notaMedia,
    latitude: api.vlLatitude ?? 0,
    longitude: api.vlLongitude ?? 0,
  };
}

// ---- Armazenamento local do modo demonstração ----------------------------
const STORAGE_KEY = "rotafolego:pontos";
const STORAGE_AVAL = "rotafolego:avaliacoes";

function lerPontosLocais(): PontoDescanso[] {
  try {
    const salvo = localStorage.getItem(STORAGE_KEY);
    if (salvo) return JSON.parse(salvo) as PontoDescanso[];
  } catch {
    /* ignora */
  }
  return [...mockPontos];
}

function salvarPontosLocais(pontos: PontoDescanso[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pontos));
  } catch {
    /* ignora */
  }
}

function lerAvaliacoesLocais(): Record<number, Avaliacao[]> {
  try {
    const salvo = localStorage.getItem(STORAGE_AVAL);
    if (salvo) return JSON.parse(salvo) as Record<number, Avaliacao[]>;
  } catch {
    /* ignora */
  }
  return {};
}

function salvarAvaliacoesLocais(dados: Record<number, Avaliacao[]>): void {
  try {
    localStorage.setItem(STORAGE_AVAL, JSON.stringify(dados));
  } catch {
    /* ignora */
  }
}

// ---- Funções públicas (as páginas chamam estas) --------------------------

export async function getPontos(): Promise<PontoDescanso[]> {
  if (USE_MOCK) return delay(lerPontosLocais());
  // A lista /pontos não traz a contagem de avaliações, então buscamos também
  // /avaliacoes (todas de uma vez) e contamos por ponto. Se /avaliacoes falhar,
  // os pontos ainda carregam normalmente (contagem fica 0).
  const [brutos, avaliacoes] = await Promise.all([
    apiFetch<PontoApi[]>("/pontos"),
    apiFetch<{ cdPonto: number }[]>("/avaliacoes").catch(() => []),
  ]);
  const contagem = new Map<number, number>();
  for (const a of avaliacoes) {
    contagem.set(a.cdPonto, (contagem.get(a.cdPonto) ?? 0) + 1);
  }
  return brutos.map((p) => ({
    ...mapearPonto(p),
    qtdAvaliacoes: contagem.get(p.cdPonto) ?? 0,
  }));
}

export interface Estatisticas {
  totalPontos: number;
  totalBairros: number;
  totalAvaliacoes: number;
}

export async function getEstatisticas(): Promise<Estatisticas> {
  const pontos = await getPontos();
  const totalBairros = new Set(pontos.map((p) => p.bairro.trim().toLowerCase())).size;
  const totalAvaliacoes = pontos.reduce((soma, p) => soma + (p.qtdAvaliacoes ?? 0), 0);
  return { totalPontos: pontos.length, totalBairros, totalAvaliacoes };
}

export async function getPonto(id: number): Promise<PontoDescanso> {
  if (USE_MOCK) {
    const ponto = lerPontosLocais().find((p) => p.cdPonto === id);
    if (!ponto) throw new Error("Ponto não encontrado");
    return delay(ponto);
  }
  const bruto = await apiFetch<PontoApi>(`/pontos/${id}`);
  return mapearPonto(bruto);
}

export async function getAvaliacoes(pontoId: number): Promise<Avaliacao[]> {
  if (USE_MOCK) {
    const todas = lerAvaliacoesLocais();
    return delay(todas[pontoId] ?? []);
  }
  return apiFetch<Avaliacao[]>(`/pontos/${pontoId}/avaliacoes`);
}

export async function criarPonto(dados: NovoPonto): Promise<PontoDescanso> {
  if (USE_MOCK) {
    const pontos = lerPontosLocais();
    const novoId = pontos.reduce((max, p) => Math.max(max, p.cdPonto), 0) + 1;
    const novo: PontoDescanso = {
      cdPonto: novoId,
      ...dados,
      notaMedia: 0,
      qtdAvaliacoes: 0,
      latitude: 0,
      longitude: 0,
    };
    pontos.push(novo);
    salvarPontosLocais(pontos);
    return delay(novo);
  }
  // Produção: a API Java espera { nmPonto, dsEndereco, cdTipo } (não aceita
  // "bairro" nem "tipo" texto). Como o banco não guarda bairro separado, nós o
  // embutimos no ds_endereco no padrão "Local - Bairro" para ele não se perder
  // (e aparecer certo na lista, que deriva o bairro do endereço).
  const partes = [dados.dsEndereco.trim(), dados.bairro.trim()].filter(Boolean);
  const dsEndereco = partes.join(" - ");
  const corpo = {
    nmPonto: dados.nmPonto.trim(),
    dsEndereco,
    cdTipo: TIPO_PARA_CODIGO[dados.tipo],
    coberto: dados.coberto,
  };
  const criado = await apiFetch<PontoApi | undefined>("/pontos", {
    method: "POST",
    body: JSON.stringify(corpo),
  });
  // Alguns back-ends respondem 201 sem corpo; nesse caso devolvemos um objeto
  // provisório (a tela recarrega a lista logo em seguida via onCreated()).
  return criado
    ? mapearPonto(criado)
    : {
        cdPonto: 0,
        nmPonto: dados.nmPonto,
        dsEndereco,
        bairro: dados.bairro,
        tipo: dados.tipo,
        coberto: dados.coberto,
        notaMedia: 0,
        latitude: 0,
        longitude: 0,
      };
}

export async function avaliarPonto(
  pontoId: number,
  dados: NovaAvaliacao
): Promise<Avaliacao> {
  if (USE_MOCK) {
    const todas = lerAvaliacoesLocais();
    const lista = todas[pontoId] ?? [];
    const nova: Avaliacao = {
      cdAvaliacao: Date.now(),
      nrNota: dados.nrNota,
      dsComentario: dados.dsComentario,
      dtAvaliacao: new Date().toISOString(),
    };
    lista.push(nova);
    todas[pontoId] = lista;
    salvarAvaliacoesLocais(todas);
    return delay(nova);
  }
  return apiFetch<Avaliacao>(`/pontos/${pontoId}/avaliacoes`, {
    method: "POST",
    body: JSON.stringify(dados),
  });
}
