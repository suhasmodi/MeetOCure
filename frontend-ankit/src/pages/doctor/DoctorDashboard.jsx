import React from "react";
import { FaBell, FaCommentDots } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import HeroCarousel from "../../components/HeroCarousel";
import TodayAppointments from "../../components/TodayAppointments";
import SidebarNav from "../../components/SidebarNav";
import BottomNav from "../../components/BottomNav";

const DoctorDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex">
      {/* Sidebar for desktop */}
      <SidebarNav />

      {/* Main dashboard content */}
      <div className="flex-1 min-h-screen bg-[#F8FAFC] text-[#1F2A37] font-[Poppins] px-6 py-6 pb-20 md:pb-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <img
              src="src/assets/logo.png"
              alt="logo"
              className="w-10 h-10 rounded-full"
            />
            <h1 className="text-2xl font-semibold">Meetocure</h1>
          </div>
          <div className="flex items-center gap-4 text-[#0A4D68] text-xl">
            <FaCommentDots className="cursor-pointer" />
            <FaBell className="cursor-pointer" />
          </div>
        </div>

        {/* Hero Banner */}
        <div className="mb-10">
          <HeroCarousel />
        </div>

        {/* Appointments Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Today Appointments</h2>
          <span
            className="text-[#0A4D68] cursor-pointer font-medium hover:underline"
            onClick={() => navigate("/doctor/appointments")}
          >
            See All
          </span>
        </div>

        {/* Appointments Grid */}
        <TodayAppointments />

        {/* Quick Stats Heading */}
        <div className="flex justify-between items-center mt-12 mb-4">
          <h2 className="text-xl font-semibold">Quick Stats</h2>
          <span className="text-[#0A4D68] cursor-pointer font-medium">See All</span>
        </div>

        {/* Quick Stats Row 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <p className="text-gray-500 text-sm">Today</p>
            <h3 className="font-semibold text-lg border-b-2 border-gray-300 pb-1 mb-3">
              Appointments
            </h3>
            <p className="text-[#0A4D68] text-xl font-bold">Count : 30</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <p className="text-gray-500 text-sm">Today</p>
            <h3 className="font-semibold text-lg border-b-2 border-gray-300 pb-1 mb-3">
              Pending Appt
            </h3>
            <p className="text-[#0A4D68] text-xl font-bold">Count : 5</p>
          </div>
        </div>

        {/* Quick Stats Row 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <p className="text-gray-500 text-sm">Today</p>
            <h3 className="font-semibold text-lg border-b-2 border-gray-300 pb-1 mb-3">
              Earnings
            </h3>
            <p className="text-[#0A4D68] text-xl font-bold">Earn : 3000</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <p className="text-gray-500 text-sm">Today</p>
            <h3 className="font-semibold text-lg border-b-2 border-gray-300 pb-1 mb-3">
              Patients
            </h3>
            <p className="text-[#0A4D68] text-xl font-bold">Count : 30</p>
          </div>
        </div>
      </div>

      {/* Bottom nav for mobile only */}
      <div className="block md:hidden">
        <BottomNav />
      </div>
    </div>
  );
};

export default DoctorDashboard;
