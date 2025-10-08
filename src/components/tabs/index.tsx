// src/components/ui/Tabs.tsx
import * as RadixTabs from "@radix-ui/react-tabs";

interface TabItem {
  value: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  items: TabItem[];
  defaultValue?: string;
  className?: string;
}

export const Tabs = ({ items, defaultValue, className = "" }: TabsProps) => {
  return (
    <RadixTabs.Root
      className={`w-full ${className}`}
      defaultValue={defaultValue || items[0].value}
    >
      {/* Lista de abas */}
      <RadixTabs.List className="flex border-b border-gray-300">
        {items.map((item) => (
          <RadixTabs.Trigger
            key={item.value}
            value={item.value}
            className="py-2 px-4 text-sm font-medium text-gray-600 data-[state=active]:text-blue-600 data-[state=active]:border-b-2 border-blue-600 transition-colors"
          >
            {item.label}
          </RadixTabs.Trigger>
        ))}
      </RadixTabs.List>

      {/* Conteúdo de cada aba */}
      {items.map((item) => (
        <RadixTabs.Content key={item.value} value={item.value} className="pt-4">
          {item.content}
        </RadixTabs.Content>
      ))}
    </RadixTabs.Root>
  );
};
