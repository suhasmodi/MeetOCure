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
import DoctorProfilePage from "./pages/doctor/profile/DoctorProfilePage";
import EditProfile from "./pages/doctor/profile/EditProfile";
import Notifications from "./pages/doctor/Notifications";
import ChatAI from "./pages/doctor/ChatAI";
import Settings from "./pages/doctor/profile/Settings";
import HelpSupport from "./pages/doctor/profile/HelpSupport";
import TermsConditions from "./pages/doctor/profile/TermsConditions";
import PatientDashboard from "./pages/patient/PatientDashboard";
import Location from "./pages/patient/Location";
import PatientProfilePage from "./pages/patient/profile/PatientProfilePage";
import PatientEditProfile from "./pages/patient/profile/PatientEditProfile";
import PatientSettings from "./pages/patient/profile/PatientSettings";
import Help from "./pages/patient/profile/Help";
import Terms from "./pages/patient/profile/Terms";
import PaymentPage from './components/Appointmentpage/PaymentPage';
import ChatPage from './components/contactpages/chatpage';
import DateTime from './components/Appointmentpage/date&time';
import Patient from './components/Appointmentpage/patientdetails';
import Contact from './components/contactpages/contactpage';
import './index.css'
import WalletPage from './components/walletpages/walletpage';
import PageNotFound from './components/Page-NotFound';
import Carddata from './components/hospitalpages/Cards-data';

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
      <Route path="/doctor/profile" element={<DoctorProfilePage />} />
      <Route path="/doctor/profile/edit" element={<EditProfile />} />
      <Route path="/doctor/notifications" element={<Notifications />} />
      <Route path="/doctor/ai-chat" element={<ChatAI />} />
      <Route path="/doctor/settings" element={<Settings />} />
      <Route path="/doctor/help" element={<HelpSupport />} />
      <Route path="/doctor/terms" element={<TermsConditions />} />
      <Route path="/patient-dashboard" element={<PatientDashboard />} />
      <Route path="/patient/profile" element={<PatientProfilePage />} />
      <Route path="/patient/profile/edit" element={<PatientEditProfile />} />
      <Route path="/location" element={<Location />} />
      <Route path="/patient/settings" element={<Settings />} />
      <Route path="/patient/help" element={<Help />} />
      <Route path="/patient/terms" element={<Terms />} />
      <Route path="/patinet/payment" element={<PaymentPage />} />
      <Route path="/patient/chat" element={<ChatPage />} />
      <Route path="/patient/date-time" element={<DateTime />} />
      <Route path="/patient/patient" element={<Patient />} />
      <Route path="/patient/contact" element={<Contact />} />
      <Route path="/patient/user-wallet" element={<WalletPage />} />
      <Route path="/patient/cards-data" element={<Carddata />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
