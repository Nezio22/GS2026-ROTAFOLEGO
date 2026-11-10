import type { PontoDescanso } from "../types/ponto";

const RAIO_TERRA_KM = 6371;
const VELOCIDADE_KMH = 4.5; // ritmo de caminhada confortável/acessível

function temCoordenada(p: PontoDescanso): boolean {
  return p.latitude !== 0 && p.longitude !== 0;
}

/** Só calculamos distância quando TODOS os pontos têm coordenada real. */
export function todosComCoordenadas(pontos: PontoDescanso[]): boolean {
  return pontos.length > 0 && pontos.every(temCoordenada);
}

function haversineKm(a: PontoDescanso, b: PontoDescanso): number {
  const toRad = (g: number) => (g * Math.PI) / 180;
  const dLat = toRad(b.latitude - a.latitude);
  const dLon = toRad(b.longitude - a.longitude);
  const lat1 = toRad(a.latitude);
  const lat2 = toRad(b.latitude);
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return 2 * RAIO_TERRA_KM * Math.asin(Math.sqrt(h));
}

/** Distância em linha reta somando as pernas do trajeto (km). */
export function distanciaTrajetoKm(pontos: PontoDescanso[]): number {
  let total = 0;
  for (let i = 1; i < pontos.length; i++) {
    total += haversineKm(pontos[i - 1], pontos[i]);
  }
  return total;
}

export function tempoCaminhadaMin(distanciaKm: number): number {
  return Math.max(1, Math.round((distanciaKm / VELOCIDADE_KMH) * 60));
}

/** Monta a URL de rota a pé no Google Maps com as paradas na ordem escolhida. */
export function googleMapsUrl(pontos: PontoDescanso[]): string {
  const coords = pontos.map((p) => `${p.latitude},${p.longitude}`);
  const params = new URLSearchParams({
    api: "1",
    origin: coords[0],
    destination: coords[coords.length - 1],
    travelmode: "walking",
  });
  const waypoints = coords.slice(1, -1).join("|");
  if (waypoints) params.set("waypoints", waypoints);
  return `https://www.google.com/maps/dir/?${params.toString()}`;
}
