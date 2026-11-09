import type { TipoPonto } from "../types/ponto";

const estilos: Record<TipoPonto, string> = {
  banco: "bg-emerald-100 text-emerald-800",
  sombra: "bg-lime-100 text-lime-800",
  marquise: "bg-sky-100 text-sky-800",
  bebedouro: "bg-cyan-100 text-cyan-800",
  banheiro: "bg-violet-100 text-violet-800",
};

const rotulos: Record<TipoPonto, string> = {
  banco: "Banco",
  sombra: "Sombra",
  marquise: "Marquise",
  bebedouro: "Bebedouro",
  banheiro: "Banheiro acessível",
};

export default function TipoBadge({ tipo }: { tipo: TipoPonto }) {
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${estilos[tipo]}`}
    >
      {rotulos[tipo]}
    </span>
  );
}
