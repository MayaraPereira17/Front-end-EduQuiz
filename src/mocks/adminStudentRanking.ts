export type AdminStudentRanking = {
  id: number;
  position: number;
  name: string;
  email: string;
  age: number;
  quizzes: number;
  score: number;
  lastQuiz: string;
};

export const adminStudentsRanking: AdminStudentRanking[] = [
  {
    id: 1,
    position: 1,
    name: "João Silva",
    email: "joao.silva@email.com",
    age: 16,
    quizzes: 24,
    score: 92,
    lastQuiz: "15/01/2024",
  },
  {
    id: 2,
    position: 2,
    name: "Mariana Costa",
    email: "mariana.costa@email.com",
    age: 17,
    quizzes: 20,
    score: 89,
    lastQuiz: "12/02/2024",
  },
  {
    id: 3,
    position: 3,
    name: "Lucas Pereira",
    email: "lucas.pereira@email.com",
    age: 18,
    quizzes: 22,
    score: 95,
    lastQuiz: "08/03/2024",
  },
  {
    id: 4,
    position: 4,
    name: "Ana Beatriz Souza",
    email: "ana.souza@email.com",
    age: 16,
    quizzes: 15,
    score: 83,
    lastQuiz: "27/03/2024",
  },
  {
    id: 5,
    position: 5,
    name: "Rafael Gomes",
    email: "rafael.gomes@email.com",
    age: 19,
    quizzes: 18,
    score: 90,
    lastQuiz: "10/04/2024",
  },
  {
    id: 6,
    position: 6,
    name: "Fernanda Lima",
    email: "fernanda.lima@email.com",
    age: 17,
    quizzes: 16,
    score: 85,
    lastQuiz: "20/05/2024",
  },
  {
    id: 7,
    position: 7,
    name: "Carlos Eduardo",
    email: "carlos.eduardo@email.com",
    age: 18,
    quizzes: 14,
    score: 77,
    lastQuiz: "29/06/2024",
  },
  {
    id: 8,
    position: 8,
    name: "Larissa Almeida",
    email: "larissa.almeida@email.com",
    age: 17,
    quizzes: 19,
    score: 91,
    lastQuiz: "03/07/2024",
  },
];
