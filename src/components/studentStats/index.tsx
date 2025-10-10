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

export function StudentStats({ item, className }: Props) {
  return (
    <div
      className={cn(
        "flex flex-col items-center bg-white rounded-4xl py-8 gap-4",
        className
      )}
      key={item.description}
    >
      <div>
        <img src={icons[item.img]} alt="" />
      </div>

      <div className="flex flex-col gap-1.5 items-center">
        <span className="font-bold text-3xl">{item.value}</span>
        <span className="text-sm text-[#404040]">{item.description}</span>
      </div>
    </div>
  );
}
