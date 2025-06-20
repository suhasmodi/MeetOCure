import React, { useState } from "react";
import {
  FaHome,
  FaChartBar,
  FaCalendarAlt,
  FaRegCalendarCheck,
  FaUser,
  FaBars,
} from "react-icons/fa";

const navItems = [
  { icon: <FaHome />, label: "Home", path: "/doctor" },
  { icon: <FaChartBar />, label: "Analytics", path: "/doctor/analytics" },
  { icon: <FaCalendarAlt />, label: "Calendar", path: "/doctor/calendar" },
  { icon: <FaRegCalendarCheck />, label: "Schedule", path: "/doctor/schedule" },
  { icon: <FaUser />, label: "Profile", path: "/doctor/profile" },
];

const SidebarNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activePath, setActivePath] = useState("/doctor"); // default page

  return (
    <div
      className={`hidden md:flex flex-col bg-white shadow-xl h-screen transition-all duration-300 ease-in-out z-50 ${
        isOpen ? "w-52" : "w-16"
      }`}
    >
      {/* Toggle */}
      <div className="flex justify-center items-center py-4 border-b">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-[#0A4D68] text-2xl focus:outline-none"
          title={isOpen ? "Collapse" : "Expand"}
        >
          <FaBars />
        </button>
      </div>

      {/* Nav Items */}
      <div className="flex flex-col items-start gap-4 py-6 px-2 text-[#0A4D68]">
        {navItems.map((item, index) => (
          <div
            key={index}
            onClick={() => setActivePath(item.path)}
            className={`group relative flex items-center gap-3 w-full p-3 rounded-lg cursor-pointer hover:bg-gray-100 transition-all ${
              activePath === item.path ? "bg-[#0A4D68]/10 font-semibold" : ""
            }`}
          >
            <div className="text-2xl">{item.icon}</div>

            {/* Tooltip when collapsed */}
            {!isOpen && (
              <span className="absolute left-16 bg-[#0A4D68] text-white text-xs px-2 py-1 rounded-md shadow-md opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-50">
                {item.label}
              </span>
            )}

            {/* Label when expanded */}
            {isOpen && (
              <span className="text-sm whitespace-nowrap">{item.label}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SidebarNav;
