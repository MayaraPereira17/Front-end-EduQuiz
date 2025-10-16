import { create } from "zustand";

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

interface QuestoesState {
  // Questões
  questoes: Questao[];
  adicionarQuestao: (questao: Questao) => void;
  adicionarQuestaoVazia: () => void;
  removerQuestao: (id: string) => void;
  atualizarQuestao: (id: string, novaQuestao: Partial<Questao>) => void;
  setRespostaCorreta: (id: string, letra: "A" | "B" | "C" | "D") => void;
  limparQuestoes: () => void;

  // Dados do quiz
  titulo: string;
  descricao: string;
  dificuldade: "easy" | "medium" | "hard" | "";
  tempoLimite: string;

  // Setters para dados do quiz
  setTitulo: (titulo: string) => void;
  setDescricao: (descricao: string) => void;
  setDificuldade: (dificuldade: "easy" | "medium" | "hard" | "") => void;
  setTempoLimite: (tempo: string) => void;

  // Reset completo
  resetQuiz: () => void;
}

export const useQuestoesStore = create<QuestoesState>((set) => ({
  // Questões
  questoes: [],
  adicionarQuestao: (questao) =>
    set((state) => ({ questoes: [...state.questoes, questao] })),
  adicionarQuestaoVazia: () =>
    set((state) => ({
      questoes: [
        ...state.questoes,
        {
          id: crypto.randomUUID(),
          pergunta: "",
          opcoes: { A: "", B: "", C: "", D: "" },
          rascunho: true,
        },
      ],
    })),
  removerQuestao: (id) =>
    set((state) => ({ questoes: state.questoes.filter((q) => q.id !== id) })),
  atualizarQuestao: (id, novaQuestao) =>
    set((state) => ({
      questoes: state.questoes.map((q) =>
        q.id === id ? { ...q, ...novaQuestao } : q
      ),
    })),
  setRespostaCorreta: (id, letra) =>
    set((state) => ({
      questoes: state.questoes.map((q) =>
        q.id === id ? { ...q, respostaCorreta: letra } : q
      ),
    })),
  limparQuestoes: () => set({ questoes: [] }),

  // Dados do quiz
  titulo: "",
  descricao: "",
  dificuldade: "",
  tempoLimite: "",
  setTitulo: (titulo) => set({ titulo }),
  setDescricao: (descricao) => set({ descricao }),
  setDificuldade: (dificuldade) => set({ dificuldade }),
  setTempoLimite: (tempo) => set({ tempoLimite: tempo }),

  // Reset completo
  resetQuiz: () =>
    set({
      questoes: [],
      titulo: "",
      descricao: "",
      dificuldade: "",
      tempoLimite: "",
    }),
}));
