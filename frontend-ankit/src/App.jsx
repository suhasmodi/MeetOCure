import React from "react";
import { Routes, Route } from "react-router-dom";
import SplashScreen from "./pages/SplashScreen";
import ChooseRoleScreen from "./pages/ChooseRoleScreen";
import DualLoginPage from "./pages/DualLoginPage";
import DualRegisterPage from "./pages/DualRegisterPage";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import DoctorAppointmentsPage from "./pages/doctor/DoctorAppointmentsPage";
import DoctorPatientDetailsPage from "./pages/doctor/DoctorPatientDetailsPage";
import QuickStatsPage from "./pages/doctor/stats/QuickStatsPage";
import DoctorAvailability from "./pages/doctor/availability/DoctorAvailability";
import ChangeAvailability from "./pages/doctor/availability/ChangeAvailability";
import AddAvailability from "./pages/doctor/availability/AddAvailability";
import ProfilePage from "./pages/doctor/profile/ProfilePage";
import EditProfile from "./pages/doctor/profile/EditProfile";
import Notifications from "./pages/doctor/Notifications";
import ChatAI from "./pages/doctor/ChatAI";
import Settings from "./pages/doctor/profile/Settings";
import HelpSupport from "./pages/doctor/profile/HelpSupport";
import TermsConditions from "./pages/doctor/profile/TermsConditions";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SplashScreen />} />
      <Route path="/choose-role" element={<ChooseRoleScreen />} />
      <Route path="/login" element={<DualLoginPage />} />
      <Route path="/register" element={<DualRegisterPage />} />
      <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
      <Route path="/doctor/appointments" element={<DoctorAppointmentsPage />} />
      <Route path="/doctor/patient/:id" element={<DoctorPatientDetailsPage />} />
      <Route path="/doctor/stats" element={<QuickStatsPage />} />
      <Route path="/doctor/availability" element={<DoctorAvailability />} />
      <Route path="/doctor/availability/change" element={<ChangeAvailability />} />
      <Route path="/doctor/availability/add" element={<AddAvailability />} />
      <Route path="/doctor/profile" element={<ProfilePage />} />
      <Route path="/doctor/profile/edit" element={<EditProfile />} />
      <Route path="/doctor/notifications" element={<Notifications />} />
      <Route path="/doctor/ai-chat" element={<ChatAI />} />
      <Route path="/doctor/settings" element={<Settings />} />
      <Route path="/doctor/help" element={<HelpSupport />} />
      <Route path="/doctor/terms" element={<TermsConditions />} />
    </Routes>
  );
}

export default App;
