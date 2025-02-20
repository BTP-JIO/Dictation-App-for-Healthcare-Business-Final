import React from "react";
import { Stethoscope } from "lucide-react";

const Header = () => {
  return (
    <header className="relative">
      <div className="bg-gradient-to-b from-white to-blue-50">
        <div className="h-1 bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400" />
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-center">
            <div className="group flex items-center gap-3 hover:opacity-90 transition-all duration-300 cursor-pointer text-center">
              <Stethoscope
                size={28}
                className="text-blue-600 group-hover:rotate-12 transition-transform duration-300"
                strokeWidth={1.5}
              />
              <h1 className="text-3xl font-semibold tracking-tight">
                <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                  Medi
                </span>
                <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  Scribe
                </span>
              </h1>
            </div>
          </div>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
      </div>
    </header>
  );
};

export default Header;
