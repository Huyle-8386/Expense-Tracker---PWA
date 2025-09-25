import React from "react";
import { FaHome, FaExchangeAlt, FaChartPie } from "react-icons/fa";

type PageType = "home" | "transactions" | "charts";

type BottomNavProps = {
  currentPage: PageType;
  setCurrentPage: React.Dispatch<React.SetStateAction<PageType>>;
};
const BottomNav: React.FC<BottomNavProps> = ({ currentPage, setCurrentPage }) => {
  const buttons = [
    { id: "home", label: "Home", icon: <FaHome /> },
    { id: "transactions", label: "Transactions", icon: <FaExchangeAlt /> },
    { id: "charts", label: "Charts", icon: <FaChartPie /> },
  ];

  return (
    <nav className="flex justify-around border-t bg-white py-2 shadow-lg">
      {buttons.map((btn) => (
        <button
          key={btn.id}
          onClick={() => setCurrentPage(btn.id)}
          className={`flex flex-col items-center text-xs font-medium px-4 py-2 transition-all ${
            currentPage === btn.id
              ? "text-[#FC00A8]"
              : "text-gray-500 hover:text-[#FC00A8]"
          }`}
        >
          <span
            className={`text-lg mb-1 ${
              currentPage === btn.id ? "scale-110" : ""
            }`}
          >
            {btn.icon}
          </span>
          {btn.label}
        </button>
      ))}
    </nav>
  );
};

export default BottomNav;
