import { ChartColumn, User } from "lucide-react";
import { Profile } from "../../../../components/profile";

export function ProfileAdmin() {
  return (
    <Profile
      firstCardIcon={<User width={32} height={32} color="#2B7FFF" />}
      firstCardValue="45"
      firstTitleCardValue="Total de Alunos"
      secondCardIcon={<ChartColumn width={32} height={32} color="#00C950" />}
      secondTitleCardValue="76.5%"
      secondaCardValue="Média da Turma"
    />
  );
}
