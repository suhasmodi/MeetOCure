import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaBell,
  FaCommentDots,
  FaEdit,
  FaUserEdit,
  FaBell as FaNotify,
  FaComments,
  FaCog,
  FaQuestionCircle,
  FaFileContract,
  FaSignOutAlt,
} from "react-icons/fa";
import BottomNav from "../../../components/BottomNav";
import EditProfileImageModal from "../../../components/EditProfileImageModal";
import { motion } from "framer-motion";

const options = [
  { icon: <FaUserEdit />, label: "Edit Profile", path: "/doctor/profile/edit" },
  { icon: <FaNotify />, label: "Notifications", path: "/doctor/notifications" },
  { icon: <FaComments />, label: "Chat with AI", path: "/doctor/ai-chat" },
  { icon: <FaCog />, label: "Settings", path: "/doctor/settings" },
  { icon: <FaQuestionCircle />, label: "Help and Support", path: "/doctor/help" },
  { icon: <FaFileContract />, label: "Terms and Conditions", path: "/doctor/terms" },
  { icon: <FaSignOutAlt />, label: "Log Out", path: "logout" },
];

const ProfilePage = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [profileImage, setProfileImage] = useState("https://via.placeholder.com/150");

  const handleOptionClick = (path) => {
    if (path === "logout") {
      console.log("Logging out...");
    } else {
      navigate(path);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0F4F8] to-[#E9F1F8] font-[Poppins] pb-24 md:pb-10">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-6 bg-white shadow-md sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <FaArrowLeft
            onClick={() => navigate("/doctor-dashboard")}
            className="text-[#0A4D68] text-xl cursor-pointer hover:text-[#08374f]"
          />
          <h1 className="text-2xl md:text-3xl font-bold text-[#1F2A37]">Profile</h1>
        </div>
        <div className="flex items-center gap-4 text-[#0A4D68] text-xl">
          <FaCommentDots className="cursor-pointer hover:text-[#08374f]" />
          <FaBell className="cursor-pointer hover:text-[#08374f]" />
        </div>
      </div>

      {/* Profile Info (animated + previous layout) */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center text-center px-4 mt-10"
      >
        <div className="relative mb-4">
          <img
            src={profileImage}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
          />
          <div
            onClick={() => setShowModal(true)}
            className="absolute bottom-2 right-2 bg-[#0A4D68] p-1.5 rounded-full cursor-pointer"
          >
            <FaEdit className="text-white text-sm" />
          </div>
        </div>
        <h2 className="text-xl font-semibold text-[#1F2A37] mb-1">
          Nutan Sai Nandam
        </h2>
        <p className="text-[#6B7280] mb-6">+91 8639068288</p>
      </motion.div>

      {/* Profile Options */}
      <div className="max-w-3xl mx-auto px-6 mt-10 space-y-4">
        {options.map((option, index) => (
          <motion.div
            key={index}
            onClick={() => handleOptionClick(option.path)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white hover:bg-[#F9FAFB] rounded-xl shadow-sm px-6 py-4 flex justify-between items-center cursor-pointer group transition-all"
          >
            <div className="flex items-center gap-4 text-[#0A4D68] text-lg group-hover:scale-105 transition">
              {option.icon}
              <span className="text-[#1F2A37] text-base md:text-lg font-medium">
                {option.label}
              </span>
            </div>
            <span className="text-gray-300 text-xl font-light group-hover:text-gray-500">
              &gt;
            </span>
          </motion.div>
        ))}
      </div>

      {/* Bottom Nav */}
      <div className="block md:hidden fixed bottom-0 left-0 right-0">
        <BottomNav />
      </div>

      {/* Edit Profile Image Modal */}
      {showModal && (
        <EditProfileImageModal
          onClose={() => setShowModal(false)}
          onSave={(newImg) => setProfileImage(newImg)}
        />
      )}
    </div>
  );
};

export default ProfilePage;
