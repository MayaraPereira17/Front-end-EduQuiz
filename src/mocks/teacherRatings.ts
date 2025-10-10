import type { IconKey } from "../types/studentRating";

export const teacherRatingsHome: {
  value: string | number;
  description: string;
  img: IconKey;
}[] = [
  {
    img: "book",
    value: 24,
    description: "Quizzes completos",
  },
  {
    img: "analytics",
    value: "78.5%",
    description: "Média geral",
  },
  {
    img: "trophy",
    value: 24,
    description: "Quizzes completos",
  },
  {
    img: "rise",
    value: 7,
    description: "Sequência",
  },
  {
    img: "star",
    value: 1890,
    description: "Pontos",
  },
];

export const studentRatingsProfile: {
  value: string | number;
  description: string;
  img: IconKey;
}[] = [
  {
    img: "book",
    value: 24,
    description: "Quizzes completos",
  },
  {
    img: "analytics",
    value: "78.5%",
    description: "Média geral",
  },
  {
    img: "rise",
    value: 7,
    description: "Sequência",
  },
  {
    img: "star",
    value: 1890,
    description: "Pontos",
  },
];
