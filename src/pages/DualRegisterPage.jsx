import React, { useState } from "react";
import logo from "../assets/logo.png";
import {
  FaUser,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUpload,
  FaPhoneAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function getInitialRole() {
  const params = new URLSearchParams(window.location.search);
  const role = params.get("role");
  return role === "patient" ? "patient" : "doctor";
}

const DualRegisterPage = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState(getInitialRole);
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
    if (!isValidPhone(formData.phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }
    setOtpSent(true);
    alert(`OTP sent to ${formData.phone} (dummy). Please enter 6-digit OTP.`);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (!otpSent) {
      alert("Please send OTP first.");
      return;
    }
    if (otp.length !== 6 || !/^\d{6}$/.test(otp)) {
      alert("Please enter a valid 6-digit OTP.");
      return;
    }
    setOtpVerified(true);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!otpVerified) return;
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    navigate(`/login?role=${role}`);
  };

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setOtpSent(false);
    setOtp("");
    setOtpVerified(false);
    setFormData({
      fullName: "",
      dob: "",
      gender: "",
      address: "",
      phone: "",
      certificate: null,
    });
  };

  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] relative">
      <div className="absolute w-full h-full overflow-hidden">
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-pink-500 opacity-20 blur-3xl rounded-full animate-pulse" />
        <div className="absolute bottom-0 right-10 w-72 h-72 bg-cyan-400 opacity-20 blur-3xl rounded-full animate-pulse" />
      </div>

      {/* Left Panel */}
      <div className="hidden lg:flex w-1/2 text-white items-center justify-center flex-col z-10">
        <div className="text-center scale-110">
          <h1 className="text-6xl font-extrabold tracking-widest bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent drop-shadow-lg">
            MeetoCure
          </h1>
          <p className="text-lg font-medium italic mt-2 opacity-80 tracking-wide">
            Caring Made Convenient.
          </p>
          <div className="mt-10 relative group">
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className={`w-44 h-44 rounded-full blur-2xl opacity-25 ${
                  role === "doctor" ? "bg-cyan-400" : "bg-pink-400"
                } animate-pulse`}
              />
            </div>
            <div className="relative bg-white rounded-full p-6 shadow-2xl w-36 h-36 mx-auto flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
              <img
                src="src/assets/logo.png"
                alt="Logo"
                className={`w-32 h-32 object-contain drop-shadow-xl ${
                  role === "doctor" ? "glow-logo-cyan" : "glow-logo-pink"
                } animate-bounce-slow`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center z-10 px-4">
        <div className="absolute top-6 right-6 flex gap-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full shadow px-4 py-1">
          <button
            className={`text-sm px-4 py-1 rounded-full transition font-semibold tracking-wide ${
              role === "doctor"
                ? "bg-blue-600 text-white shadow-inner"
                : "text-gray-300 hover:text-white"
            }`}
            onClick={() => handleRoleChange("doctor")}
          >
            Doctor
          </button>
          <button
            className={`text-sm px-4 py-1 rounded-full transition font-semibold tracking-wide ${
              role === "patient"
                ? "bg-blue-600 text-white shadow-inner"
                : "text-gray-300 hover:text-white"
            }`}
            onClick={() => handleRoleChange("patient")}
          >
            Patient
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleRegister}
          className="bg-white/10 backdrop-blur-xl shadow-2xl rounded-2xl px-10 py-8 w-full max-w-md text-white border border-white/20 space-y-5"
          autoComplete="off"
        >
          <h2 className="text-4xl font-bold text-center mb-6 tracking-wide">
            {role === "doctor" ? "Doctor Registration" : "Patient Registration"}
          </h2>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <div className="flex items-center border border-white/30 bg-white/5 rounded-lg px-3 py-2">
              <FaUser className="text-cyan-300 mr-2" />
              <input
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                className="w-full outline-none bg-transparent text-white placeholder-gray-300"
                required
                value={formData.fullName}
                onChange={handleChange}
                disabled={otpSent}
              />
            </div>
          </div>

          {/* DOB */}
          <div>
            <label className="block text-sm font-medium mb-1">Date of Birth</label>
            <div className="flex items-center border border-white/30 bg-white/5 rounded-lg px-3 py-2">
              <FaCalendarAlt className="text-cyan-300 mr-2" />
              <input
                type="date"
                name="dob"
                className="w-full outline-none bg-transparent text-white"
                required
                value={formData.dob}
                onChange={handleChange}
                disabled={otpSent}
              />
            </div>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium mb-1">Gender</label>
            <div className="flex gap-4">
              {["Male", "Female", "Other"].map((gender) => (
                <label key={gender} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value={gender}
                    required
                    onChange={handleChange}
                    checked={formData.gender === gender}
                    disabled={otpSent}
                  />
                  {gender}
                </label>
              ))}
            </div>
          </div>

          {/* Address */}
          {role === "doctor" && (
            <div>
              <label className="block text-sm font-medium mb-1">Address</label>
              <div className="flex items-center border border-white/30 bg-white/5 rounded-lg px-3 py-2">
                <FaMapMarkerAlt className="text-cyan-300 mr-2" />
                <input
                  type="text"
                  name="address"
                  placeholder="Enter your hospital or clinic address"
                  className="w-full outline-none bg-transparent text-white placeholder-gray-300"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  disabled={otpSent}
                />
              </div>
            </div>
          )}

          {/* Phone + OTP */}
          <div>
            <label className="block text-sm font-medium mb-1">Phone Number</label>
            <div className="flex items-center border border-white/30 bg-white/5 rounded-lg px-3 py-2">
              <FaPhoneAlt className="text-cyan-300 mr-2" />
              <input
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                className="w-full outline-none bg-transparent text-white placeholder-gray-300"
                required
                value={formData.phone}
                onChange={handleChange}
                disabled={otpSent}
              />
              {!otpSent ? (
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="ml-3 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold shadow-lg transition"
                >
                  Send OTP
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  className="ml-3 px-4 py-2 rounded-full bg-green-600 hover:bg-green-700 text-white font-semibold shadow-lg transition"
                >
                  Verify OTP
                </button>
              )}
            </div>
          </div>

          {otpSent && (
            <div>
              <label className="block text-sm font-medium mb-1">Enter OTP</label>
              <input
                type="text"
                maxLength={6}
                placeholder="6-digit OTP"
                className="w-full border border-white/30 bg-white/5 text-white placeholder-gray-300 rounded-lg px-3 py-2 outline-none tracking-widest text-center text-xl"
                value={otp}
                onChange={(e) => {
                  const val = e.target.value;
                  if (/^\d*$/.test(val) && val.length <= 6) setOtp(val);
                }}
                required
                autoFocus
                disabled={otpVerified}
              />
            </div>
          )}

          {role === "doctor" && (
            <div>
              <label className="block text-sm font-medium mb-1">Upload Certificate Proof</label>
              <div className="border border-dashed border-white/30 rounded-lg p-4 text-center bg-white/5">
                <FaUpload className="mx-auto text-2xl text-cyan-300 mb-2" />
                <p className="text-gray-300">
                  Drag & Drop or <span className="text-blue-400 underline cursor-pointer">Browse</span>
                </p>
                <input
                  type="file"
                  name="certificate"
                  accept="image/*,.pdf"
                  className="hidden"
                  onChange={handleChange}
                  disabled={otpSent}
                />
              </div>
            </div>
          )}

          {/* Register btn*/}
          <div className="pt-4 text-center">
            <button
              type="submit"
              disabled={!otpVerified}
              className={`w-full px-6 py-3 rounded-full font-semibold shadow-xl transition 
                ${otpVerified ? "bg-green-600 hover:bg-green-700 text-white" : "bg-gray-400 cursor-not-allowed text-white/70"}`}
            >
              Register
            </button>
            <p className="mt-3 text-sm text-gray-300">
              Already have an account?{" "}
              <span
                onClick={() => navigate(`/login?role=${role}`)}
                className="text-blue-400 cursor-pointer underline"
              >
                Login
              </span>
            </p>
          </div>
        </form>

        {/* Popup */}
        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 max-w-sm text-center shadow-xl">
              <h3 className="text-2xl font-bold mb-4 text-green-700">
                Registration Successful!
              </h3>
              <p className="mb-6 text-gray-700">
                Thank you for registering as a {role}. You can now login.
              </p>
              <button
                onClick={handleClosePopup}
                className="px-6 py-2 rounded-full bg-green-600 text-white font-semibold hover:bg-green-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DualRegisterPage;
