interface QuestionData {
  question: string;
  options: string[];
  correctIndex: number;
}

export const questionsMock: QuestionData[] = [
  {
    question: "Qual é a capital do Brasil?",
    options: [
      "São Paulo",
      "Brasília",
      "Rio de Janeiro",
      "Salvador",
      "Curitiba",
    ],
    correctIndex: 1,
  },
  {
    question: "Qual é 2 + 2?",
    options: ["3", "4", "5", "6", "7"],
    correctIndex: 1,
  },
  {
    question: "Qual é a maior lua de Saturno?",
    options: ["Io", "Ganimedes", "Titã", "Europa", "Calisto"],
    correctIndex: 2,
  },
  {
    question: "Quem escreveu 'Dom Quixote'?",
    options: [
      "William Shakespeare",
      "Miguel de Cervantes",
      "Machado de Assis",
      "José de Alencar",
      "Eça de Queirós",
    ],
    correctIndex: 1,
  },
  {
    question: "Qual é o símbolo químico do ouro?",
    options: ["Au", "Ag", "Fe", "Hg", "Pb"],
    correctIndex: 0,
  },
  {
    question: "Qual planeta é conhecido como o planeta vermelho?",
    options: ["Vênus", "Marte", "Júpiter", "Saturno", "Mercúrio"],
    correctIndex: 1,
  },
  {
    question: "Qual é a raiz quadrada de 81?",
    options: ["7", "8", "9", "10", "11"],
    correctIndex: 2,
  },
  {
    question: "Qual é a língua oficial do Brasil?",
    options: ["Inglês", "Espanhol", "Português", "Francês", "Alemão"],
    correctIndex: 2,
  },
  {
    question: "Quem pintou a Mona Lisa?",
    options: [
      "Vincent van Gogh",
      "Leonardo da Vinci",
      "Pablo Picasso",
      "Michelangelo",
      "Rembrandt",
    ],
    correctIndex: 1,
  },
  {
    question: "Qual é o maior oceano do mundo?",
    options: ["Atlântico", "Pacífico", "Índico", "Ártico", "Antártico"],
    correctIndex: 1,
  },
];
