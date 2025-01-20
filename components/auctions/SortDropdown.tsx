import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SortDropdownProps {
  onSortChange: (value: string) => void;
}

export const SortDropdown = ({ onSortChange }: SortDropdownProps) => {
  return (
    <Select onValueChange={onSortChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort by..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="price-asc">Price: Low to High</SelectItem>
        <SelectItem value="price-desc">Price: High to Low</SelectItem>
        <SelectItem value="ending-soon">Ending Soon</SelectItem>
        <SelectItem value="recently-added">Recently Added</SelectItem>
      </SelectContent>
    </Select>
  );
};
