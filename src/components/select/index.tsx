import * as Select from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import clsx from "clsx";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  placeholder?: string;
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
}

export function CustomSelect({
  options,
  placeholder = "Selecione...",
  value,
  onValueChange,
  className,
}: CustomSelectProps) {
  return (
    <Select.Root value={value} onValueChange={onValueChange}>
      <Select.Trigger
        className={clsx(
          "flex items-center justify-between w-full bg-[#F3F3F5] border border-black/10 py-2.5 rounded-lg px-3 text-sm text-[#717182]",
          className
        )}
      >
        <Select.Value placeholder={placeholder} />
        <Select.Icon>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          position="popper"
          sideOffset={5}
          align="start"
          className={clsx(
            // ESSA LINHA É O SEGREDO
            "min-w-[var(--radix-select-trigger-width)] w-[var(--radix-select-trigger-width)]",
            "overflow-hidden bg-white rounded-xl shadow-lg border border-gray-200 z-50"
          )}
        >
          <Select.ScrollUpButton className="flex items-center justify-center py-1 bg-white text-gray-500">
            <ChevronUp className="w-4 h-4" />
          </Select.ScrollUpButton>

          <Select.Viewport className="p-1">
            {options.map((option) => (
              <Select.Item
                key={option.value}
                value={option.value}
                className={clsx(
                  "relative flex items-center px-3 py-2 rounded-md text-sm cursor-pointer select-none text-gray-700",
                  "focus:bg-blue-100 focus:text-blue-700 focus:border-black"
                )}
              >
                <Select.ItemText>{option.label}</Select.ItemText>
                <Select.ItemIndicator className="absolute right-2 inline-flex items-center">
                  <Check className="w-4 h-4 text-blue-600" />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>

          <Select.ScrollDownButton className="flex items-center justify-center py-1 bg-white text-gray-500">
            <ChevronDown className="w-4 h-4" />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
