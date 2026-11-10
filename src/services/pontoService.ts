import type {
  PontoDescanso,
  Avaliacao,
  NovoPonto,
  NovaAvaliacao,
} from "../types/ponto";
import { USE_MOCK, apiFetch, delay } from "./api";
import { mockPontos } from "../data/mockPontos";

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
  return apiFetch<PontoDescanso[]>("/pontos");
}

export async function getPonto(id: number): Promise<PontoDescanso> {
  if (USE_MOCK) {
    const ponto = lerPontosLocais().find((p) => p.cdPonto === id);
    if (!ponto) throw new Error("Ponto não encontrado");
    return delay(ponto);
  }
  return apiFetch<PontoDescanso>(`/pontos/${id}`);
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
  // Produção: a API de DDD prevê POST /pontos.
  return apiFetch<PontoDescanso>("/pontos", {
    method: "POST",
    body: JSON.stringify(dados),
  });
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
