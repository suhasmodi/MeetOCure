import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import NotificationItem from "../../components/NotificationItem";
import TopIcons from "../../components/TopIcons";

const notifications = {
  today: [
    {
      type: "success",
      title: "Appointment Success",
      message: "A patient has successfully booked an appointment with you.",
      time: "1h ago",
    },
    {
      type: "cancel",
      title: "Appointment Cancelled",
      message: "A patient has cancelled their appointment.",
      time: "2h ago",
    },
    {
      type: "reschedule",
      title: "Schedule Changed",
      message: "A patient has rescheduled their appointment.",
      time: "8h ago",
    },
  ],
  yesterday: [
    {
      type: "success",
      title: "Appointment Success",
      message: "A patient booked an appointment with you.",
      time: "1 day ago",
    },
  ],
};

const Notifications = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F9FAFC] font-[Poppins] pb-24">
      {/* Topbar */}
      <div className="flex items-center justify-between px-6 py-5 border-b bg-white shadow-sm sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <FaArrowLeft
            className="text-2xl text-[#1F2A37] cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <h1 className="text-[22px] font-semibold text-[#1F2A37]">
            Notifications
          </h1>
        </div>
        <TopIcons /> {/* ✅ Reusable top right icons */}
      </div>

      <div className="px-6 pt-6 space-y-10">
        {/* Section: Today */}
        <section>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-sm font-semibold uppercase text-gray-500 tracking-wide">
              Today
            </h2>
            <button className="text-sm text-blue-600 hover:underline">
              Mark all as read
            </button>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 divide-y">
            {notifications.today.map((notif, index) => (
              <NotificationItem key={index} {...notif} />
            ))}
          </div>
        </section>

        {/* Section: Yesterday */}
        <section>
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-sm font-semibold uppercase text-gray-500 tracking-wide">
              Yesterday
            </h2>
            <button className="text-sm text-blue-600 hover:underline">
              Mark all as read
            </button>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 divide-y">
            {notifications.yesterday.map((notif, index) => (
              <NotificationItem key={index} {...notif} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Notifications;
