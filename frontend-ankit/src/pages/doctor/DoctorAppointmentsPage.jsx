// DoctorAppointmentsPage.jsx
import React, { useState } from "react";
import AppointmentTabs from "../../components/AppointmentTabs";
import AppointmentCard from "../../components/AppointmentCard";
import PatientModal from "../../components/PatientModal";

const allAppointments = [
  {
    id: 1,
    name: "Nithin Sai",
    age: 22,
    gender: "Male",
    phone: "+91 8630968288",
    date: "June 13, 2025",
    time: "11.00 AM",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    status: "Upcoming",
    concern: "Fever and Cough",
  },
  {
    id: 2,
    name: "Manideep",
    age: 30,
    gender: "Male",
    phone: "+91 9390481522",
    date: "June 13, 2025",
    time: "11.30 AM",
    photo: "https://randomuser.me/api/portraits/men/25.jpg",
    status: "Upcoming",
    concern: "Headache",
  },
  {
    id: 3,
    name: "Rishik",
    age: 21,
    gender: "Male",
    phone: "+91 8465871402",
    date: "June 13, 2025",
    time: "10.00 AM",
    photo: "https://randomuser.me/api/portraits/men/10.jpg",
    status: "Completed",
  },
  {
    id: 4,
    name: "Purnima",
    age: 25,
    gender: "Female",
    phone: "+91 7032835465",
    date: "June 13, 2025",
    time: "9.30 AM",
    photo: "https://randomuser.me/api/portraits/women/15.jpg",
    status: "Completed",
  },
  {
    id: 5,
    name: "Keerthi Sree",
    age: 19,
    gender: "Female",
    phone: "+91 6281073365",
    date: "June 13, 2025",
    time: "10.00 AM",
    photo: "https://randomuser.me/api/portraits/women/19.jpg",
    status: "Canceled",
  },
];

const DoctorAppointmentsPage = () => {
  const [selectedTab, setSelectedTab] = useState("Upcoming");
  const [selectedPatient, setSelectedPatient] = useState(null);

  const filteredAppointments = allAppointments.filter(
    (appt) => appt.status === selectedTab
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] to-[#ECF3F9] px-6 py-8 md:px-12 text-[#1F2A37] font-poppins">
      <header className="flex items-center justify-between mb-8 border-b border-[#E2E8F0] pb-4">
        <h1 className="text-3xl font-bold tracking-tight text-[#0A4D68]">
          Appointments
        </h1>
        <div className="flex gap-3 items-center">
          <img src="/icons/message.svg" alt="Message" className="w-5 h-5" />
          <img
            src="/icons/notification.svg"
            alt="Notifications"
            className="w-5 h-5"
          />
        </div>
      </header>

      <AppointmentTabs active={selectedTab} onChange={setSelectedTab} />

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
        {filteredAppointments.map((appt) => (
          <AppointmentCard
            key={appt.id}
            appt={appt}
            onView={(p) => setSelectedPatient(p)}
          />
        ))}
        {filteredAppointments.length === 0 && (
          <p className="text-center text-gray-400 text-sm mt-10">
            No appointments in this category.
          </p>
        )}
      </section>

      <PatientModal
        isOpen={!!selectedPatient}
        patient={selectedPatient}
        onClose={() => setSelectedPatient(null)}
      />
    </div>
  );
};

export default DoctorAppointmentsPage;