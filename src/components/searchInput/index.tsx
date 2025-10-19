import { useRef } from "react";
import searchIcon from "../../assets/icons/search.svg";

interface SearchInputProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export function SearchInput({ value = "", onChange, placeholder = "Buscar..." }: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    inputRef.current?.focus();
  };
  
  return (
    <div
      className="flex items-center gap-3 bg-white border border-[#D9D9D9] rounded-[100px] px-4 py-2 shadow-sm w-full"
      onClick={handleFocus}
    >
      <img src={searchIcon} alt="Buscar" className="w-6 h-6 opacity-70" />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="flex-1 bg-transparent outline-none text-[#404040] placeholder:text-[#A3A3A3]"
      />
    </div>
  );
}
