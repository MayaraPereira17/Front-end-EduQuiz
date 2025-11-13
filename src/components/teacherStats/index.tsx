import analyticsImg from "../../assets/icons/analytics.svg";
import trophyImg from "../../assets/icons/trophy.svg";
import riseImg from "../../assets/icons/rise.svg";
import bookImg from "../../assets/icons/book-blue.svg";
import starImg from "../../assets/icons/star.svg";
import type { IconKey } from "../../types/studentRating";
import { cn } from "../../utils/cn";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  item: {
    value: string | number;
    description: string;
    img: IconKey;
  };
}

const icons = {
  analytics: analyticsImg,
  trophy: trophyImg,
  rise: riseImg,
  book: bookImg,
  star: starImg,
};

export function TeacherStats({ item, className }: Props) {
  return (
    <div
      className={cn(
        "flex flex-col items-center bg-white rounded-2xl sm:rounded-3xl md:rounded-4xl py-4 sm:py-6 md:py-8 gap-2 sm:gap-3 md:gap-4",
        className
      )}
      key={item.description}
    >
      <div>
        <img src={icons[item.img]} alt="" className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
      </div>

      <div className="flex flex-col gap-1 sm:gap-1.5 items-center">
        <span className="font-bold text-xl sm:text-2xl md:text-3xl">{item.value}</span>
        <span className="text-xs sm:text-sm text-[#404040] text-center px-1">{item.description}</span>
      </div>
    </div>
  );
}
