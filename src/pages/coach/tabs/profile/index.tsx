import { Profile } from "../../../../components/profile";
import { BookOpen, ChartColumn } from "lucide-react";

export function ProfileCoach() {
  return (
    <Profile
      firstCardIcon={<BookOpen width={32} height={32} color="#00C950" />}
      firstCardValue="12"
      firstTitleCardValue="Quizzes Criados"
      secondCardIcon={<ChartColumn width={32} height={32} color="#F0B100" />}
      secondTitleCardValue="74.2%"
      secondaCardValue="Média dos Alunos"
    />
  );
}
