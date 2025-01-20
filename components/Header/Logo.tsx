import Image from "next/image";
import { Gavel } from "lucide-react";

export const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative w-8 h-8 text-primary">
        <Gavel className="w-8 h-8" />
      </div>
      <span className="font-bold text-xl hidden sm:block">E-Auction</span>
    </div>
  );
};
