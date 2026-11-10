import type { LucideIcon } from "lucide-react";
import { Armchair, TreePine, Umbrella, GlassWater, Accessibility } from "lucide-react";
import type { TipoPonto } from "../types/ponto";

export const TIPOS: TipoPonto[] = ["banco", "sombra", "marquise", "bebedouro", "banheiro"];

interface TipoMeta {
  label: string;
  badge: string; // classes de cor do badge
  Icon: LucideIcon;
  imagem: string; // ilustração representativa da CATEGORIA (não é foto do local real)
}

export const tipoInfo: Record<TipoPonto, TipoMeta> = {
  banco: {
    label: "Banco",
    badge: "bg-folego-100 text-folego-700",
    Icon: Armchair,
    imagem: "/images/02_Pontos/ponto_01_banco_praca.png",
  },
  sombra: {
    label: "Sombra",
    badge: "bg-[#e3efe0] text-[#3f6b3a]",
    Icon: TreePine,
    imagem: "/images/02_Pontos/ponto_02_sombra_ipes.png",
  },
  marquise: {
    label: "Marquise",
    badge: "bg-[#f1e6cf] text-[#8a6d2f]",
    Icon: Umbrella,
    imagem: "/images/02_Pontos/ponto_03_marquise_mercado.png",
  },
  bebedouro: {
    label: "Bebedouro",
    badge: "bg-[#dcefe9] text-folego-700",
    Icon: GlassWater,
    imagem: "/images/02_Pontos/ponto_04_bebedouro_parque.png",
  },
  banheiro: {
    label: "Banheiro acessível",
    badge: "bg-[#f3e0d6] text-[#a4552f]",
    Icon: Accessibility,
    imagem: "/images/02_Pontos/ponto_05_banheiro_acessivel.png",
  },
};

export function tipoLabel(t: TipoPonto): string {
  return tipoInfo[t]?.label ?? t;
}
