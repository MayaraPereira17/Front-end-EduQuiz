export interface IStudentsDetails {
  name: string;
  finishedQuizzes: number;
  lastQuizzDate: string;
  percentage: number;
}

export const studentsDetails: IStudentsDetails[] = [
  { 
    name: "João Silva",
    finishedQuizzes: 15,
    lastQuizzDate: "19/01/2024",
    percentage: 92
  },
  { 
    name: "Mariana Costa",
    finishedQuizzes: 12,
    lastQuizzDate: "05/02/2024",
    percentage: 88
  },
  { 
    name: "Lucas Pereira",
    finishedQuizzes: 20,
    lastQuizzDate: "27/03/2024",
    percentage:95
  },
  { 
    name: "Ana Beatriz Souza",
    finishedQuizzes: 8,
    lastQuizzDate: "10/04/2024",
    percentage: 74
  },
  { 
    name: "Carlos Eduardo",
    finishedQuizzes: 17,
    lastQuizzDate: "22/05/2024",
    percentage: 90
  },
  { 
    name: "Fernanda Lima",
    finishedQuizzes: 10,
    lastQuizzDate: "11/06/2024",
    percentage: 81
  },
  { 
    name: "Rafael Gomes",
    finishedQuizzes: 13,
    lastQuizzDate: "29/07/2024",
    percentage: 86
  },
  { 
    name: "Larissa Almeida",
    finishedQuizzes: 18,
    lastQuizzDate: "02/08/2024",
    percentage: 93
  }
]