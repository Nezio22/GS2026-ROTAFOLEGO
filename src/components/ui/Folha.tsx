type FolhaProps = {
  /** Caminho da imagem decorativa em /images/09_Decorativos. */
  src: string;
  /** Classes de posição, tamanho e opacidade (ex.: "right-0 top-24 w-48 opacity-20"). */
  className?: string;
};

/**
 * Folha decorativa, puramente visual.
 * Fica atrás do conteúdo, não recebe clique e é ignorada por leitores de tela.
 * O container pai deve ser `relative` (e o body já tem overflow-x oculto,
 * então nada aqui gera rolagem horizontal).
 */
export default function Folha({ src, className = "" }: FolhaProps) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden
      loading="lazy"
      draggable={false}
      className={`pointer-events-none absolute -z-10 select-none ${className}`}
    />
  );
}
