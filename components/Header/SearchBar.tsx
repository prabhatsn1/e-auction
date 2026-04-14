"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export const SearchBar = () => (
  <div className="relative w-full">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
    <Input
      type="search"
      placeholder="Search auctions..."
      className="pl-9 w-full bg-secondary/80 border-transparent focus:border-primary/50 focus:bg-white transition-all rounded-full text-sm"
      aria-label="Search auctions"
    />
  </div>
);
