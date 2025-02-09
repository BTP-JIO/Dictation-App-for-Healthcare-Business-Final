// const Header = () => {
//   const userDetails = JSON.parse(localStorage.getItem("userDetails"));

//   return (
//     <div className="bg-gradient-to-r from-[#7dbeff] to-[#6781ff] shadow-md text-[#ffffff] py-4 px-6 flex justify-between items-center">
//       <div className="w-24"></div>
//       <h1 className="text-2xl font-semibold flex-grow text-center">
//         MEDISCRIBE
//       </h1>
//     </div>
//   );
// };

// ---------------------OLDER V ABOVE------------------------

import React from "react";
import { Stethoscope } from "lucide-react";

const Header = () => {
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  return (
    <header className="relative">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg">
        <div className="h-1 bg-gradient-to-r from-blue-200 to-indigo-200 opacity-30" />
        <div className="py-4 px-6 flex items-center justify-between">
          <div className="flex-1" />
          <div className="flex items-center space-x-2">
            <Stethoscope size={22} className="text-white" />
            <h1 className="text-2xl font-bold text-white tracking-wide">
              Medi<span className="text-blue-200">Scribe</span>
            </h1>
          </div>
          {userDetails ? (
            <div className="flex-1 flex justify-end">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white">
                {userDetails.name?.[0]?.toUpperCase() || "U"}
              </div>
            </div>
          ) : (
            <div className="flex-1" />
          )}
        </div>
        <div className="h-0.5 bg-gradient-to-r from-blue-200 to-indigo-200 opacity-30" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-b from-black/5 to-transparent" />
    </header>
  );
};

export default Header;
