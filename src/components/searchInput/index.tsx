import { useRef, useState, useEffect } from "react";
import searchIcon from "../../assets/icons/search.svg";

interface SearchInputProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch?: (termo: string) => void;
  placeholder?: string;
}

export function SearchInput({ value = "", onChange, onSearch, placeholder = "Buscar..." }: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState(value);
  const [searchTimeout, setSearchTimeout] = useState<number | null>(null);

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchTerm(newValue);
    
    // Chamar onChange se fornecido
    if (onChange) {
      onChange(e);
    }

    // Debounce para onSearch
    if (onSearch) {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
      
      const timeout = window.setTimeout(() => {
        onSearch(newValue);
      }, 500);
      
      setSearchTimeout(timeout);
    }
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, [searchTimeout]);
  
  return (
    <div
      className="flex items-center gap-3 bg-white border border-[#D9D9D9] rounded-[100px] px-4 py-2 shadow-sm w-full"
      onClick={handleFocus}
    >
      <img src={searchIcon} alt="Buscar" className="w-6 h-6 opacity-70" />
      <input
        ref={inputRef}
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="flex-1 bg-transparent outline-none text-[#404040] placeholder:text-[#A3A3A3]"
      />
    </div>
  );
}
