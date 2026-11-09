// Tipos que espelham o JSON que a API Java (DDD) vai devolver.
// Mantenha estes nomes iguais aos campos do back-end da Julia.

export type TipoPonto = "banco" | "sombra" | "marquise" | "bebedouro" | "banheiro";

export interface PontoDescanso {
  cdPonto: number;
  nmPonto: string;
  dsEndereco: string;
  bairro: string;
  tipo: TipoPonto;
  coberto: boolean;
  notaMedia: number;
  latitude: number;
  longitude: number;
}

export interface Avaliacao {
  cdAvaliacao: number;
  nrNota: number; // 1 a 5
  dsComentario: string;
  dtAvaliacao: string;
}

// Dados que o formulário envia (POST) — sem o id, que o back-end gera.
export interface NovoPonto {
  nmPonto: string;
  dsEndereco: string;
  bairro: string;
  tipo: TipoPonto;
  coberto: boolean;
}

export interface NovaAvaliacao {
  nrNota: number;
  dsComentario: string;
}
