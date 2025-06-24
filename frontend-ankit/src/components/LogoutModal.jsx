import React from "react";
import { FaSignOutAlt } from "react-icons/fa";

const LogoutModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white w-11/12 max-w-md p-8 rounded-2xl shadow-xl text-center animate-fade-in">
        <div className="text-[#0A4D68] text-4xl mb-4">
          <FaSignOutAlt />
        </div>
        <h2 className="text-xl font-bold text-[#1F2A37] mb-2">Log Out</h2>
        <p className="text-gray-500 mb-6">Are you sure you want to log out?</p>
        <div className="flex gap-4">
          <button
            onClick={onCancel}
            className="flex-1 py-2 border border-[#0A4D68] text-[#0A4D68] rounded-full font-medium hover:bg-[#F1FAFC] transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2 bg-[#0A4D68] text-white rounded-full font-medium hover:bg-[#08374f] transition"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
