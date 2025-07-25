import React, { useState } from "react";
import { FaArrowLeft, FaUser, FaPhoneAlt, FaVenusMars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import TopIcons from "../../../components/PatientTopIcons";

const PatientDetails = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    age: "",
    gender: "",
    photo: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenderSelect = (gender) => {
    setFormData((prev) => ({ ...prev, gender }));
  };

  const handlePhotoUpload = (e) => {
    setFormData((prev) => ({ ...prev, photo: e.target.files[0] }));
  };

  const handleContinue = () => {
    if (formData.name && formData.mobile && formData.age && formData.gender) {
      navigate("/patient/appointments/payment");
    }
  };

  return (
    <div className="min-h-screen bg-white px-6 py-6 lg:px-20 lg:py-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-gray-600 hover:text-black">
            <FaArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-semibold">Appointment</h1>
        </div>
        <TopIcons />
      </div>

      {/* Step Progress */}
      <div className="flex justify-center mb-10">
        <div className="flex items-center gap-6 text-center">
          <div>
            <div className="w-10 h-10 rounded-full bg-[#0A4D68] text-white flex items-center justify-center font-semibold">✓</div>
            <p className="text-sm text-[#0A4D68] mt-2">Date & Time</p>
          </div>
          <div className="w-10 h-px bg-gray-300 mt-4"></div>
          <div>
            <div className="w-10 h-10 rounded-full bg-[#0A4D68] text-white flex items-center justify-center font-semibold">2</div>
            <p className="text-sm text-[#0A4D68] mt-2">Patient Detail</p>
          </div>
          <div className="w-10 h-px bg-gray-300 mt-4"></div>
          <div>
            <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center font-semibold">3</div>
            <p className="text-sm text-gray-400 mt-2">Payment</p>
          </div>
        </div>
      </div>

      {/* Form Centered Card */}
      <div className="max-w-3xl mx-auto bg-gray-50 rounded-2xl p-8 shadow-md space-y-6">
        {/* Patient Name */}
        <div>
          <label className="block font-semibold mb-1">Patient Name</label>
          <div className="flex items-center border border-gray-300 rounded-xl px-3 py-2 gap-2 bg-white">
            <FaUser className="text-gray-500" />
            <input
              type="text"
              name="name"
              placeholder="Enter Patient Name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full focus:outline-none"
            />
          </div>
        </div>

        {/* Mobile Number */}
        <div>
          <label className="block font-semibold mb-1">Mobile Number</label>
          <div className="flex items-center border border-gray-300 rounded-xl px-3 py-2 gap-2 bg-white">
            <FaPhoneAlt className="text-gray-500" />
            <input
              type="tel"
              name="mobile"
              placeholder="Enter Mobile Number"
              value={formData.mobile}
              onChange={handleInputChange}
              className="w-full focus:outline-none"
            />
          </div>
        </div>

        {/* Age */}
        <div>
          <label className="block font-semibold mb-1">Age</label>
          <input
            type="number"
            name="age"
            placeholder="Enter Age"
            value={formData.age}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none bg-white"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block font-semibold mb-2">Gender</label>
          <div className="flex gap-4">
            {["Male", "Female", "Other"].map((g) => (
              <button
                key={g}
                onClick={() => handleGenderSelect(g)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border font-medium transition ${
                  formData.gender === g
                    ? "bg-[#0A4D68] text-white border-[#0A4D68]"
                    : "bg-white text-gray-700 border-gray-300 hover:border-[#0A4D68]"
                }`}
              >
                <FaVenusMars />
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Upload Photo */}
        <div>
          <label className="block font-semibold mb-2 text-[#0A4D68]">Upload Photo</label>
          <div className="border-2 border-dashed border-[#0A4D68] rounded-xl p-6 text-center bg-white">
            <label className="cursor-pointer block">
              <div className="bg-[#0A4D68] text-white py-2 px-6 rounded-full w-max mx-auto mb-2">
                Browse Your Device
              </div>
              <input type="file" onChange={handlePhotoUpload} className="hidden" />
            </label>
            <p className="text-gray-500">Or Drag & Drop here</p>
          </div>
        </div>

        {/* Continue Button */}
        <div className="flex justify-end pt-4">
          <button
            onClick={handleContinue}
            disabled={!formData.name || !formData.mobile || !formData.age || !formData.gender}
            className={`px-6 py-3 rounded-xl text-white font-semibold text-lg transition ${
              formData.name && formData.mobile && formData.age && formData.gender
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

export default PatientDetails;
