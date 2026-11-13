import type { DragEvent } from "react";
import { GripVertical } from "lucide-react";
import type { PontoDescanso } from "../../types/ponto";
import { tipoInfo } from "../../lib/pontos";
import Badge from "../ui/Badge";

interface Props {
  ponto: PontoDescanso;
  selecionado: boolean;
  onToggle: (id: number) => void;
  index: number;
  onDragStart: (index: number) => void;
  onDragOver: (e: DragEvent, index: number) => void;
  onDrop: (index: number) => void;
  arrastando: boolean;
}

export default function TrajetoPointItem({
  ponto,
  selecionado,
  onToggle,
  index,
  onDragStart,
  onDragOver,
  onDrop,
  arrastando,
}: Props) {
  const info = tipoInfo[ponto.tipo];
  return (
    // O card inteiro é um <label>: tocar em qualquer parte dele marca/desmarca
    // o checkbox. No celular o arrastar não funciona (drag só no desktop), então
    // depender só do checkbox na borda deixava a seleção difícil e "cortada".
    <label
      draggable
      onDragStart={() => onDragStart(index)}
      onDragOver={(e) => onDragOver(e, index)}
      onDrop={() => onDrop(index)}
      className={`flex cursor-pointer select-none items-center gap-3 rounded-2xl border bg-white p-3 transition ${
        selecionado ? "border-folego-300 bg-folego-50/40" : "border-folego-100"
      } ${arrastando ? "opacity-40" : ""}`}
    >
      <span
        className="hidden shrink-0 cursor-grab text-grafite/30 active:cursor-grabbing sm:inline-flex"
        title="Arraste para reordenar"
        aria-hidden
      >
        <GripVertical className="h-5 w-5" />
      </span>

      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-areia/60 text-folego-700">
        <info.Icon className="h-5 w-5" aria-hidden />
      </span>

      <span className="min-w-0 flex-1">
        <span className="block truncate font-bold text-folego-700">{ponto.nmPonto}</span>
        <span className="block truncate text-sm text-grafite/60">{ponto.bairro}</span>
      </span>

      <Badge tone="salvia" className="hidden sm:inline-flex">
        {info.label}
      </Badge>

      <input
        type="checkbox"
        checked={selecionado}
        onChange={() => onToggle(ponto.cdPonto)}
        aria-label={`Incluir ${ponto.nmPonto} no trajeto`}
        className="h-6 w-6 shrink-0 rounded border-folego-300 text-folego-600 focus:ring-folego-500"
      />
    </label>
  );
}
