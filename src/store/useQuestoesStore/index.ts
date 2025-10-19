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
  carregarQuestoes: (questoes: any[]) => void;

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
  carregarQuestoes: (questoes) => {
    const questoesFormatadas = questoes.map((questao) => {
      const opcaoCorreta = questao.opcoes?.find((op: any) => op.correta);
      let respostaCorreta: "A" | "B" | "C" | "D" | undefined = undefined;
      
      if (opcaoCorreta) {
        switch (opcaoCorreta.ordemIndice) {
          case 0: respostaCorreta = 'A'; break;
          case 1: respostaCorreta = 'B'; break;
          case 2: respostaCorreta = 'C'; break;
          case 3: respostaCorreta = 'D'; break;
        }
      }
      
      return {
        id: questao.id?.toString() || crypto.randomUUID(),
        pergunta: questao.textoQuestao || questao.pergunta || '',
        opcoes: {
          A: questao.opcoes?.[0]?.textoOpcao || '',
          B: questao.opcoes?.[1]?.textoOpcao || '',
          C: questao.opcoes?.[2]?.textoOpcao || '',
          D: questao.opcoes?.[3]?.textoOpcao || '',
        },
        rascunho: false,
        respostaCorreta,
      };
    });
    set({ questoes: questoesFormatadas });
  },

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
