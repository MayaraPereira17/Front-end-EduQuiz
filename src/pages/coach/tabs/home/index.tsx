import { TeacherStats } from "../../../../components/teacherStats";
import { teacherRatingsHome } from "../../../../mocks/teacherRatings";

export function Home() {
  return (
    <div>
      <div>
        <h4>Olá, Prof.!</h4>
        <span>Acompanhe o progresso dos seus alunos.</span>
      </div>
      <div className="grid grid-cols-5 gap-7">
        {teacherRatingsHome.map((item) => (
          <TeacherStats item={item} />
        ))}
      </div>

      <div className="grid grid-cols-3 gap-7">
        {teacherRatingsHome.map((item) => (
          <TeacherStats item={item} />
        ))}
      </div>
    </div>
  );
}
