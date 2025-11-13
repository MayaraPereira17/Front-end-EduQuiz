import { useNavigate } from "react-router";
import ArrowLeftIcon from "../../../assets/icons/arrow-left.svg";

interface Props {
  title: string;
  subtitle: string;
}
export function TitleWithGoBack({ title, subtitle }: Props) {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="my-4 sm:my-6 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
      <button
        className="border py-1.5 sm:py-2 px-3 sm:px-4 border-black/10 bg-white flex items-center justify-center gap-2 sm:gap-2.5 rounded-lg hover:bg-gray-50 transition-colors text-xs sm:text-sm"
        onClick={goBack}
      >
        <img src={ArrowLeftIcon} alt="" className="w-4 h-4 sm:w-5 sm:h-5" />
        <span>Voltar</span>
      </button>

      <div>
        <h4 className="font-bold text-2xl sm:text-3xl md:text-4xl">{title}</h4>
        <span className="text-sm sm:text-base text-[#4A5565]">{subtitle}</span>
      </div>
    </div>
  );
}
