import React from "react";
import {
  FaHome,
  FaChartBar,
  FaCalendarAlt,
  FaRegCalendarCheck,
  FaUser,
} from "react-icons/fa";

const BottomNav = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t shadow-md z-50 block md:hidden">
      <div className="flex justify-around items-center h-16 px-4 text-[#0A4D68] text-xl">
        <FaHome className="cursor-pointer" />
        <FaChartBar className="cursor-pointer" />
        <FaCalendarAlt className="cursor-pointer" />
        <FaRegCalendarCheck className="cursor-pointer" />
        <FaUser className="cursor-pointer" />
      </div>
    </div>
  );
};

export default BottomNav;
