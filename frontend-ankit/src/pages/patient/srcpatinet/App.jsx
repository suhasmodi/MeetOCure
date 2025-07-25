import React from 'react';
import PaymentPage from './components/Appointmentpage/paymentPage.jsx';
import ChatPage from './components/contactpages/chatpage.jsx';
import DateTime from './components/Appointmentpage/date&time.jsx';
import Patient from './components/Appointmentpage/patientdetails.jsx';
import Contact from './components/contactpages/contactpage.jsx';
import './index.css'
import { Route, Routes } from 'react-router-dom';
import WalletPage from './components/walletpages/walletpage.jsx';
import PageNotFound from './components/Page-NotFound.jsx';
import Carddata from './components/hospitalpages/Cards-data.jsx';

function App() {
  return (
    <div className="w-full h-screen bg-gray-100">
      <Routes>
        <Route path="/" element={
          <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
            <div className="text-4xl font-extrabold text-teal-700 mb-2">🏥 Hospital Demo</div>
            <p className="text-gray-600 mb-4">Welcome to the Hospital Appointment System Demo!</p>
            <div className="flex gap-4 mt-2">
              <a href="/date-time" className="bg-teal-700 hover:bg-teal-800 text-white px-5 py-2 rounded-full font-semibold shadow transition-all">Book Appointment</a>
              </div>
          </div>
        } />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/date-time" element={<DateTime />} />
        <Route path="/patient" element={<Patient />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/user-wallet" element={<WalletPage />} />
        <Route path="/cards-data" element={<Carddata />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;

