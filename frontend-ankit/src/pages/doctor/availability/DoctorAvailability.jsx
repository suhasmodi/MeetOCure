import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaCalendarAlt, FaClock, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import BottomNav from "../../../components/BottomNav";
import TopIcons from "../../../components/TopIcons";
import axios from "axios";

const DoctorAvailability = () => {
  const navigate = useNavigate();
  const [availability, setAvailability] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const token = localStorage.getItem("token");
        // You may need to get the doctorId from user info or backend
        const user = JSON.parse(localStorage.getItem("user"));
        const doctorId = user?._id;
        if (!doctorId) {
          setLoading(false);
          return;
        }
        const res = await axios.get(
          `https://meetocure.onrender.com/api/availability/${doctorId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAvailability(res.data.days || []);
      } catch {
        setAvailability([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAvailability();
  }, []);

  // Helper to get today's and tomorrow's slots
  const getSlotsForDay = (offset = 0) => {
    const dateObj = new Date();
    dateObj.setDate(dateObj.getDate() + offset);
    const dateStr = dateObj.toISOString().slice(0, 10); // "YYYY-MM-DD"
    const found = availability.find((d) => d.date === dateStr);
    return found ? found.slots : [];
  };

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

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
        <TopIcons />
      </div>

      {/* TODAY & TOMORROW cards vertically stacked */}
      <div className="space-y-8 max-w-3xl mx-auto">
        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : (
          <>
            <AvailabilityCard
              dayLabel="Today"
              date={today.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}
              slots={getSlotsForDay(0)}
              onChange={() => navigate("/doctor/availability/change")}
            />

            <AvailabilityCard
              dayLabel="Tomorrow"
              date={tomorrow.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}
              slots={getSlotsForDay(1)}
              onChange={() => navigate("/doctor/availability/change")}
            />
          </>
        )}
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
      {slots.length === 0 ? (
        <span className="text-gray-400">No slots set</span>
      ) : (
        slots.map((slot, idx) => (
          <div
            key={idx}
            className="flex items-center gap-1 bg-[#E0F2F1] text-[#0A4D68] px-4 py-2 rounded-full text-sm font-medium shadow-sm transition-transform duration-200 hover:scale-105"
          >
            <FaClock className="text-sm" />
            {slot}
          </div>
        ))
      )}
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
