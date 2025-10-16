export type Opcao = "A" | "B" | "C" | "D";

export interface Opcoes {
  A: string;
  B: string;
  C: string;
  D: string;
}

export interface Questao {
  id: string;
  pergunta: string;
  opcoes: Opcoes;
  rascunho: boolean;
  respostaCorreta?: "A" | "B" | "C" | "D";
}
