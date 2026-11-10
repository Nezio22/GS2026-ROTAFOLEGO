export interface Integrante {
  /** identificador usado na rota /integrante/:rm (valor = slug) */
  slug: string;
  nome: string;
  papel: string;
  disciplinas: string[];
  contribuicoes: string[];
  avatar: string;
  github?: string;
  linkedin?: string;
  /** RM — opcional; não é inventado quando não informado */
  rm?: string;
}
