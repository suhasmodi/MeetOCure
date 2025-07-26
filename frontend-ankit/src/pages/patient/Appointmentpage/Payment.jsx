import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import TopIcons from "../../../components/PatientTopIcons";

const upiOptions = [
  { name: "Google Pay", icon: "/assets/payments/gpay.png" },
  { name: "Phonepe", icon: "/assets/payments/phonepe.png" },
  { name: "Paytm", icon: "/assets/payments/paytm.png" },
  { name: "CRED", icon: "/assets/payments/cred.png" },
  { name: "Amazon Pay", icon: "/assets/payments/amazonpay.png" },
];

const Payment = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("");

  const handleContinue = () => {
    if (selectedOption) {
      alert(`Payment option selected: ${selectedOption}`);
      navigate("/patient-dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 py-6 lg:px-8 lg:py-10 flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-4xl mb-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-gray-600 hover:text-black">
            <FaArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-semibold">Payment</h1>
        </div>
        <TopIcons />
      </div>

      {/* Stepper */}
      <div className="w-full max-w-2xl mb-10 flex justify-center">
        <div className="flex items-center gap-6 text-center">
          <div>
            <div className="w-10 h-10 rounded-full bg-[#0A4D68] text-white flex items-center justify-center font-semibold">✓</div>
            <p className="text-sm text-[#0A4D68] mt-2">Date & Time</p>
          </div>
          <div className="w-10 h-px bg-gray-300 mt-4"></div>
          <div>
            <div className="w-10 h-10 rounded-full bg-[#0A4D68] text-white flex items-center justify-center font-semibold">✓</div>
            <p className="text-sm text-[#0A4D68] mt-2">Patient Detail</p>
          </div>
          <div className="w-10 h-px bg-gray-300 mt-4"></div>
          <div>
            <div className="w-10 h-10 rounded-full bg-[#0A4D68] text-white flex items-center justify-center font-semibold">3</div>
            <p className="text-sm text-[#0A4D68] mt-2">Payment</p>
          </div>
        </div>
      </div>

      {/* UPI Options */}
      <div className="w-full max-w-2xl bg-gray-50 rounded-xl shadow-sm p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">UPI Payment</h2>

        {upiOptions.map((option) => (
          <label
            key={option.name}
            className={`flex items-center justify-between border rounded-xl px-4 py-3 cursor-pointer transition-all ${
              selectedOption === option.name
                ? "border-[#0A4D68] bg-[#e6f0f3]"
                : "border-gray-300"
            }`}
          >
            <div className="flex items-center gap-4">
              <img src={option.icon} alt={option.name} className="w-8 h-8 object-contain" />
              <span className="text-base font-medium">{option.name}</span>
            </div>
            <input
              type="radio"
              name="upi"
              value={option.name}
              checked={selectedOption === option.name}
              onChange={() => setSelectedOption(option.name)}
              className="w-5 h-5 accent-[#0A4D68]"
            />
          </label>
        ))}

        {/* Continue Button */}
        <div className="flex justify-end pt-4">
          <button
            onClick={handleContinue}
            disabled={!selectedOption}
            className={`px-6 py-3 rounded-xl text-white font-semibold text-lg transition ${
              selectedOption
                ? "bg-[#0A4D68] hover:bg-[#083952]"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
