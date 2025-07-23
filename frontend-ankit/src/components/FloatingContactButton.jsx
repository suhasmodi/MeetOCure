import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHeadset } from "react-icons/fa";

const FloatingContactButton = () => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/contact")}
      title="Contact us"
      className="fixed bottom-6 right-6 z-50 w-20 h-20 bg-[#0A4D68] rounded-full flex flex-col items-center justify-center cursor-pointer shadow-xl transform transition-transform duration-300 hover:scale-110"
    >
      <FaHeadset className="text-white text-2xl mb-1" />
      <span className="text-white text-[11px] leading-tight font-semibold">
        Contact us
      </span>
    </div>
  );
};

export default FloatingContactButton;
