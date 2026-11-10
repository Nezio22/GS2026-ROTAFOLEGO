// ===========================================================================
//  Configuração central da comunicação com a API Java (Spring Boot).
//
//  USE_MOCK = true  -> usa dados de demonstração locais (enquanto a API Java
//                      não está publicada). Fica CLARAMENTE separado da produção.
//  USE_MOCK = false -> usa a API real em BASE_URL, só com fetch() nativo.
// ===========================================================================
export const USE_MOCK = true;
export const BASE_URL = "https://rota-folego-api.onrender.com";

/** Helper de requisição real usando apenas fetch() nativo. */
export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const resp = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
  if (!resp.ok) {
    throw new Error(`Falha na requisição (${resp.status})`);
  }
  if (resp.status === 204) {
    return undefined as T;
  }
  return (await resp.json()) as T;
}

/** Simula a latência da rede no modo demonstração. */
export function delay<T>(valor: T, ms = 500): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(valor), ms));
}
