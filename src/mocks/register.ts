import { CircleUser, Wrench, GraduationCap } from "lucide-react";

export const labels = [
  {
    label: "Nome Completo",
    placeholder: "Nome",
  },
  {
    label: "Email",
    placeholder: "Email",
  },
  {
    label: "CPF",
    placeholder: "CPF",
  },
  {
    label: "Data de Nascimento",
    placeholder: "**/**/****",
  },
  {
    label: "Senha",
    placeholder: "*********",
  },
  {
    label: "Cofirmar Senha",
    placeholder: "*********",
  },
];

export const userType = [
  {
    title: "Aluno",
    description: "Participe de quizzes e acompanhe seu progresso",
    icon: CircleUser,
  },
  {
    title: "Professor",
    description: "Crie e gerencie quizzes para seus alunos",
    icon: Wrench,
    fields: [
      { label: "Instituição de Ensino", placeholder: "Nome da Escola" },
      {
        label: "Área de Especialização",
        placeholder: "EX: Matématica, História, Ciências",
      },
    ],
  },
  {
    title: "Técnico",
    description: "Suporte técnico e moderação da plataforma",
    icon: GraduationCap,
    fields: [
      { label: "Organização/Empresa", placeholder: "Nome da empresa" },
      { label: "Chave de liberação de acesso", placeholder: "*********" },
    ],
  },
];
