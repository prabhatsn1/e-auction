"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export const SearchBar = () => (
  <div className="relative w-full">
    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
    <Input
      type="search"
      placeholder="Search auctions..."
      className="w-full rounded-full border-transparent bg-secondary/80 pl-9 text-sm transition-all focus:border-primary/50 focus:bg-white"
      aria-label="Search auctions"
    />
  </div>
);
