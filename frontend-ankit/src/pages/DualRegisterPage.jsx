import React, { useState } from "react";
import {
  FaUser,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUpload,
  FaPhoneAlt,
  FaArrowLeft,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function getInitialRole() {
  const params = new URLSearchParams(window.location.search);
  const role = params.get("role");
  return role === "patient" ? "patient" : "doctor";
}

const DualRegisterPage = () => {
  const navigate = useNavigate();
  const [role] = useState(getInitialRole);
  const isDoctor = role === "doctor";

  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    gender: "",
    address: "",
    phone: "",
    certificate: null,
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "certificate") {
      setFormData((prev) => ({ ...prev, certificate: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const isValidPhone = (phone) => /^\d{10}$/.test(phone);

  const handleSendOtp = () => {
    if (!isValidPhone(formData.phone)) return;
    setOtpSent(true);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (!otpSent) return;
    if (otp.length !== 6 || !/^\d{6}$/.test(otp)) return;
    setOtpVerified(true);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!otpVerified) return;
    setShowPopup(true);
    setTimeout(() => {
      navigate(`/login?role=${role}`);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-white font-[Poppins] px-6 pt-6 pb-28">
      <button onClick={() => navigate(-1)} className="text-xl mb-4">
        <FaArrowLeft />
      </button>

      {/* Header Logo */}
      <div className="flex flex-col items-center text-center mb-6">
        <img src="/assets/logo.png" alt="Logo" className="w-28 h-28 mb-4" />
        <h1 className="text-3xl font-extrabold text-[#004B5C]">Hi, Welcome!</h1>
        <p className="text-base text-gray-700 mt-1">
          Fill the Details and Register Here
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleRegister}
        className="max-w-md mx-auto space-y-6"
        autoComplete="off"
      >
        {/* Full Name */}
        <div>
          <label className="block text-sm font-semibold mb-1">Full Name</label>
          <div className="flex items-center border border-[#7A869A] rounded-xl px-3 py-2">
            <FaUser className="text-[#7A869A] mr-2" />
            <input
              type="text"
              name="fullName"
              placeholder="Enter Your Full Name"
              className="w-full outline-none bg-transparent text-gray-700 placeholder-gray-500"
              required
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* DOB */}
        <div>
          <label className="block text-sm font-semibold mb-1">Date of Birth</label>
          <div className="flex items-center border border-[#7A869A] rounded-xl px-3 py-2">
            <input
              type="date"
              name="dob"
              className="w-full outline-none bg-transparent text-gray-700"
              required
              value={formData.dob}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-semibold mb-1">Gender</label>
          <div className="flex gap-4">
            {["Male", "Female", "Other"].map((gender) => (
              <label
                key={gender}
                className={`flex items-center gap-2 px-4 py-2 border rounded-xl text-sm font-medium cursor-pointer transition-all duration-200 ${formData.gender === gender
                  ? "bg-[#004B5C] text-white"
                  : "border-[#7A869A] text-[#2C3E50]"
                  }`}
              >
                <input
                  type="radio"
                  name="gender"
                  value={gender}
                  onChange={handleChange}
                  className="hidden"
                />
                <span>{gender}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-semibold mb-1">Phone Number</label>
          <div className="flex items-center border border-[#7A869A] rounded-xl px-3 py-2">
            <FaPhoneAlt className="text-[#7A869A] mr-2" />
            <input
              type="tel"
              name="phone"
              placeholder="Enter Your Phone Number"
              className="w-full outline-none bg-transparent text-gray-700 placeholder-gray-500"
              required
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          {!otpSent ? (
            <button
              type="button"
              onClick={handleSendOtp}
              className="mt-2 px-4 py-2 bg-[#004B5C] text-white rounded-full font-medium"
            >
              Send OTP
            </button>
          ) : (
            <div className="mt-3">
              <label className="block text-sm font-semibold mb-1">Enter OTP</label>
              <input
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full border border-[#7A869A] px-4 py-2 rounded-xl outline-none placeholder-gray-500"
                placeholder="6-digit OTP"
              />
              <button
                type="button"
                onClick={handleVerifyOtp}
                className="mt-2 px-4 py-2 bg-green-600 text-white rounded-full font-medium"
              >
                Verify OTP
              </button>
            </div>
          )}
        </div>

        {/* Address (Only for Doctor) */}
        {isDoctor && (
          <div>
            <label className="block text-sm font-semibold mb-1">Address</label>
            <input
              type="text"
              name="address"
              placeholder="Enter your Hospital or Clinic Address"
              className="w-full border border-[#7A869A] px-4 py-2 rounded-xl outline-none placeholder-gray-500"
              required
              value={formData.address}
              onChange={handleChange}
            />
          </div>
        )}

        {/* Certificate Upload (Only for Doctor) */}
        {isDoctor && (
          <div>
            <label className="block text-base font-semibold text-[#004B5C] mb-2">
              Upload Certificate Proof
            </label>
            <div className="border-2 border-dashed border-[#004B5C] p-4 rounded-xl text-center">
              <label className="block bg-[#004B5C] text-white py-2 rounded-full w-full cursor-pointer">
                Browse Your Device
                <input
                  type="file"
                  name="certificate"
                  accept="image/*,.pdf"
                  className="hidden"
                  onChange={handleChange}
                />
              </label>
              <p className="mt-2 text-sm text-gray-600">Or Drag & Drop here</p>
              <div className="w-full h-24 border border-dashed border-[#004B5C] mt-4 flex items-center justify-center text-3xl text-[#004B5C]">
                +
              </div>
            </div>
          </div>
        )}

        {/* Register button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full py-3 rounded-full font-semibold bg-[#004B5C] text-white hover:bg-[#003246] transition"
          >
            Register
          </button>
          {/* Login Redirect */}
          <div className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <span
              onClick={() => navigate(`/login?role=${role}`)}
              className="text-[#004B5C] font-semibold underline cursor-pointer"
            >
              Login here
            </span>
          </div>
        </div>
      </form>

      {/* Popup Success */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-[2rem] px-10 py-8 max-w-sm w-full text-center shadow-2xl">
            <img
              src="/assets/popups/success.png"
              alt="Success"
              className="w-28 h-28 object-contain mx-auto mb-6"
            />
            <h3 className="text-[22px] font-bold text-[#1F2A37] mb-2">
              Registration Successful
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Registration successful! Redirecting to the home screen.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DualRegisterPage;