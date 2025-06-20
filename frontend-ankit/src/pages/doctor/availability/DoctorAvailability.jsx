import React from "react";
import { FaArrowLeft, FaCalendarAlt, FaClock, FaBell, FaCommentDots, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import BottomNav from "../../../components/BottomNav";

const DoctorAvailability = () => {
  const navigate = useNavigate();

  return (
    <div className="relative bg-[#F8FAFC] min-h-screen font-[Poppins] px-4 py-6 md:px-10 md:py-10 overflow-hidden">
      {/* Background Gradient Accent */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-[#F0F9FF] to-[#DFF4F3] rounded-b-full blur-xl opacity-50 -z-10" />

      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/doctor-dashboard")} className="text-[#0A4D68] text-xl">
            <FaArrowLeft />
          </button>
          <h1 className="text-3xl font-bold text-[#0A4D68] tracking-tight">Availability</h1>
        </div>
        <div className="flex items-center gap-4 text-[#0A4D68] text-xl">
          <FaCommentDots className="cursor-pointer hover:text-[#08374f]" />
          <FaBell className="cursor-pointer hover:text-[#08374f]" />
        </div>
      </div>

      {/* TODAY & TOMORROW cards vertically stacked */}
      <div className="space-y-8 max-w-3xl mx-auto">
        <AvailabilityCard
          dayLabel="Today"
          date="June 13, 2025"
          slots={[
            "10:00 AM – 10:30 AM",
            "10:30 AM – 11:00 AM",
            "11:00 AM – 11:30 AM",
            "11:30 AM – 12:00 AM",
            "12:00 AM – 12:30 AM"
          ]}
          onChange={() => navigate("/doctor/availability/change")}
        />

        <AvailabilityCard
          dayLabel="Tomorrow"
          date="June 14, 2025"
          slots={[
            "10:00 AM – 10:30 AM",
            "10:30 AM – 11:00 AM",
            "12:00 AM – 12:30 AM"
          ]}
          onChange={() => navigate("/doctor/availability/change")}
        />
      </div>

      {/* Floating Add Button */}
      <div className="fixed bottom-6 right-6 md:right-10">
        <button
          onClick={() => navigate("/doctor/availability/add")}
          className="bg-[#0A4D68] hover:bg-[#08374f] text-white px-6 py-3 rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg"
        >
          <FaPlus /> Add Availability
        </button>
      </div>

      {/* BottomNav (only mobile) */}
      <div className="block md:hidden mt-10">
        <BottomNav />
      </div>
    </div>
  );
};

const AvailabilityCard = ({ dayLabel, date, slots, onChange }) => (
  <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all hover:-translate-y-1 duration-300">
    <h2 className="text-lg font-bold text-[#1F2A37] mb-2">{dayLabel}</h2>
    <hr className="mb-4" />
    <div className="flex items-center gap-2 text-[#0A4D68] font-semibold text-base mb-4">
      <FaCalendarAlt className="text-md" />
      <span>{date}</span>
    </div>

    {/* Slot Chips */}
    <div className="flex flex-wrap gap-3 text-sm mb-6">
      {slots.map((slot, idx) => (
        <div
          key={idx}
          className="flex items-center gap-1 bg-[#E0F2F1] text-[#0A4D68] px-4 py-2 rounded-full text-sm font-medium shadow-sm transition-transform duration-200 hover:scale-105"
        >
          <FaClock className="text-sm" />
          {slot}
        </div>
      ))}
    </div>

    {/* Action Buttons */}
    <div className="flex gap-4">
      <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-full font-semibold hover:bg-gray-200 transition">
        Delete
      </button>
      <button
        onClick={onChange}
        className="flex-1 bg-[#0A4D68] text-white py-2 rounded-full font-semibold hover:bg-[#08374f] transition"
      >
        Change
      </button>
    </div>
  </div>
);

export default DoctorAvailability;
