import { Menu, Search, Bell } from "lucide-react";
import React from "react";

function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Menu className="h-6 w-6 text-gray-500" />
            <h1 className="text-2xl font-bold text-blue-600">AuctionHub</h1>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for items..."
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Bell className="h-6 w-6 text-gray-500" />
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
              Start Selling
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
