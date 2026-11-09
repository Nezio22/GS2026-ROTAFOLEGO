import type {
  PontoDescanso,
  Avaliacao,
  NovoPonto,
  NovaAvaliacao,
} from "../types/ponto";
import { mockPontos } from "../data/mockPontos";

// ===========================================================================
//  CAMADA DE SERVIÇO
//  Enquanto a API Java não está pronta, USE_MOCK = true usa dados locais.
//  Quando a API da Julia estiver no ar, troque para false e ajuste BASE_URL.
//  As funções de "verdade" (com Fetch) já estão escritas abaixo.
// ===========================================================================
const USE_MOCK = true;
const BASE_URL = "https://rota-folego-api.onrender.com"; // URL da API Java (Render)

// Simula a latência da rede para o loading aparecer.
function delay<T>(valor: T, ms = 500): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(valor), ms));
}

// ---- Persistência local do mock (simula o POST salvando de verdade) --------
const STORAGE_KEY = "rotafolego:pontos";
const STORAGE_AVAL = "rotafolego:avaliacoes";

function lerPontosLocais(): PontoDescanso[] {
  try {
    const salvo = localStorage.getItem(STORAGE_KEY);
    if (salvo) return JSON.parse(salvo) as PontoDescanso[];
  } catch {
    // ignora erro de localStorage (aba anônima etc.)
  }
  return [...mockPontos];
}

function salvarPontosLocais(pontos: PontoDescanso[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pontos));
  } catch {
    // ignora
  }
}

function lerAvaliacoesLocais(): Record<number, Avaliacao[]> {
  try {
    const salvo = localStorage.getItem(STORAGE_AVAL);
    if (salvo) return JSON.parse(salvo) as Record<number, Avaliacao[]>;
  } catch {
    // ignora
  }
  return {};
}

function salvarAvaliacoesLocais(dados: Record<number, Avaliacao[]>): void {
  try {
    localStorage.setItem(STORAGE_AVAL, JSON.stringify(dados));
  } catch {
    // ignora
  }
}

// ===========================================================================
//  FUNÇÕES PÚBLICAS — é isto que as páginas chamam.
// ===========================================================================

export async function getPontos(): Promise<PontoDescanso[]> {
  if (USE_MOCK) {
    return delay(lerPontosLocais());
  }
  const r = await fetch(`${BASE_URL}/pontos`);
  if (!r.ok) throw new Error("Falha ao buscar pontos");
  return r.json();
}

export async function getPonto(id: number): Promise<PontoDescanso> {
  if (USE_MOCK) {
    const ponto = lerPontosLocais().find((p) => p.cdPonto === id);
    if (!ponto) throw new Error("Ponto não encontrado");
    return delay(ponto);
  }
  const r = await fetch(`${BASE_URL}/pontos/${id}`);
  if (!r.ok) throw new Error("Ponto não encontrado");
  return r.json();
}

export async function getAvaliacoes(pontoId: number): Promise<Avaliacao[]> {
  if (USE_MOCK) {
    const todas = lerAvaliacoesLocais();
    return delay(todas[pontoId] ?? []);
  }
  const r = await fetch(`${BASE_URL}/pontos/${pontoId}/avaliacoes`);
  if (!r.ok) throw new Error("Falha ao buscar avaliações");
  return r.json();
}

export async function criarPonto(dados: NovoPonto): Promise<PontoDescanso> {
  if (USE_MOCK) {
    const pontos = lerPontosLocais();
    const novoId = pontos.reduce((max, p) => Math.max(max, p.cdPonto), 0) + 1;
    const novo: PontoDescanso = {
      cdPonto: novoId,
      ...dados,
      notaMedia: 0,
      latitude: 0,
      longitude: 0,
    };
    pontos.push(novo);
    salvarPontosLocais(pontos);
    return delay(novo);
  }
  const r = await fetch(`${BASE_URL}/pontos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  if (!r.ok) throw new Error("Falha ao cadastrar o ponto");
  return r.json();
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
  const r = await fetch(`${BASE_URL}/pontos/${pontoId}/avaliacoes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  if (!r.ok) throw new Error("Falha ao enviar a avaliação");
  return r.json();
}
