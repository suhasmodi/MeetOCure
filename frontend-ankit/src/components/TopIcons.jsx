import React from "react";
import { FaBell, FaCommentDots } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const TopIcons = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-4">
      {/* Message Icon */}
      <FaCommentDots
        className="text-xl text-[#0A4D68] cursor-pointer hover:text-[#08374f] transition"
        onClick={() => navigate("/doctor/ai-chat")}
        title="Chat"
      />

      {/* Notification Icon */}
      <FaBell
        className="text-xl text-[#0A4D68] cursor-pointer hover:text-[#08374f] transition"
        onClick={() => navigate("/doctor/notifications")}
        title="Notifications"
      />
    </div>
  );
};

export default TopIcons;
