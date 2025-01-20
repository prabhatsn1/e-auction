import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, SlidersHorizontal } from "lucide-react";

interface FilterSidebarProps {
  onFilterChange: (filters: any) => void;
}

export const FilterSidebar = ({ onFilterChange }: FilterSidebarProps) => {
  return (
    <Card className="w-72">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5" />
          Filters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="relative">
          <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search auctions..."
            className="pl-8"
            onChange={(e) => onFilterChange({ search: e.target.value })}
          />
        </div>

        <div>
          <Label className="text-sm font-medium">Price Range</Label>
          <div className="mt-4">
            <Slider
              defaultValue={[0, 1000]}
              max={10000}
              step={100}
              className="mt-2"
              onValueChange={(value) => onFilterChange({ priceRange: value })}
            />
            <div className="flex justify-between mt-2">
              <span className="text-sm text-muted-foreground">$0</span>
              <span className="text-sm text-muted-foreground">$10,000</span>
            </div>
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium">Status</Label>
          <div className="space-y-2 mt-2">
            {["ACTIVE", "SCHEDULED", "ENDED"].map((status) => (
              <div key={status} className="flex items-center space-x-2">
                <Checkbox id={status} />
                <label htmlFor={status} className="text-sm">
                  {status.charAt(0) + status.slice(1).toLowerCase()}
                </label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
