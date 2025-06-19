import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DualLoginPage from "./pages/DualLoginPage";
import DualRegisterPage from "./pages/DualRegisterPage";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import DoctorAppointmentsPage from "./pages/doctor/DoctorAppointmentsPage";
import DoctorPatientDetailsPage from "./pages/doctor/DoctorPatientDetailsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<DualLoginPage />} />
      <Route path="/register" element={<DualRegisterPage />} />
      <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
      <Route path="/doctor/appointments" element={<DoctorAppointmentsPage />} />
      <Route path="/doctor/patient/:id" element={<DoctorPatientDetailsPage />} />
    </Routes>
  );
}

export default App;
