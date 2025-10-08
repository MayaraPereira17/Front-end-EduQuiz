interface Props {
  value: string | number;
  description?: string;
}
export function RankingItem({ value, description }: Props) {
  return (
    <div className="flex flex-col items-center justify-center">
      <span className="font-bold text-md">{value}</span>
      <span className="text-[#404040]">{description}</span>
    </div>
  );
}
