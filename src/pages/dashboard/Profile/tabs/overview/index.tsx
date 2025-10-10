import { StudentStats } from "../../../../../components/studentStats";
import { studentRatingsProfile } from "../../../../../mocks/studentRatings";

export function Overview() {
  return (
    <div className="grid grid-cols-4 gap-16">
      {studentRatingsProfile.map((item) => (
        <StudentStats item={item} />
      ))}
    </div>
  );
}
