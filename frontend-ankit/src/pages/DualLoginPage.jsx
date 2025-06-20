import React, { useState, useEffect } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

const DualLoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [role, setRole] = useState("doctor");
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const roleParam = params.get("role");
    if (roleParam === "patient" || roleParam === "doctor") {
      setRole(roleParam);
    }
  }, [location.search]);

  const handleGetOtp = () => {
    if (!phone || phone.length < 10) {
      alert("Please enter a valid phone number.");
      return;
    }
    setOtpSent(true);
    console.log(`Sending OTP to ${phone} for ${role}`);
  };

  const handleLogin = () => {
    if (!otp || otp.length < 4) {
      alert("Please enter valid OTP.");
      return;
    }
    if (role === "doctor") {
      navigate("/doctor-dashboard");
    } else {
      navigate("/patient-dashboard");
    }
  };

  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] relative">
      {/* Neon Glow */}
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
            {/* Aura Glow bg */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`w-44 h-44 rounded-full blur-2xl opacity-25 ${role === "doctor" ? "bg-cyan-400" : "bg-pink-400"} animate-pulse`} />
            </div>
            {/* Logo */}
            <div className="relative bg-white rounded-full p-6 shadow-2xl w-36 h-36 mx-auto flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
              <img
                src="/assets/logo.png"
                alt="Logo"
                className={`w-32 h-32 object-contain drop-shadow-xl ${role === "doctor" ? "glow-logo-cyan" : "glow-logo-pink"} animate-bounce-slow`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center z-10 px-4">
        {/* Toggle */}
        <div className="absolute top-6 right-6 flex gap-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full shadow px-4 py-1">
          <button
            className={`text-sm px-4 py-1 rounded-full transition font-semibold tracking-wide ${role === "doctor"
              ? "bg-blue-600 text-white shadow-inner"
              : "text-gray-300 hover:text-white"
              }`}
            onClick={() => setRole("doctor")}
          >
            Doctor
          </button>
          <button
            className={`text-sm px-4 py-1 rounded-full transition font-semibold tracking-wide ${role === "patient"
              ? "bg-blue-600 text-white shadow-inner"
              : "text-gray-300 hover:text-white"
              }`}
            onClick={() => setRole("patient")}
          >
            Patient
          </button>
        </div>

        {/* Form Card */}
        <div className="bg-white/10 backdrop-blur-xl shadow-2xl rounded-2xl px-10 py-8 w-full max-w-md text-white border border-white/20">
          <h2 className="text-4xl font-bold text-center mb-6 tracking-wide">
            {role === "doctor" ? "Doctor Login" : "Patient Login"}
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Phone Number</label>
              <div className="flex items-center border border-white/30 bg-white/5 rounded-lg px-3 py-2">
                <FaPhoneAlt className="text-cyan-300 mr-2" />
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full outline-none bg-transparent text-white placeholder-gray-300"
                />
              </div>
            </div>

            {!otpSent ? (
              <button
                onClick={handleGetOtp}
                className="w-full py-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-blue-500 hover:to-cyan-600 text-white font-semibold transition-all shadow-lg"
              >
                Get OTP
              </button>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">Enter OTP</label>
                  <input
                    type="text"
                    placeholder="Enter the OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full border border-white/30 bg-white/5 text-white placeholder-gray-300 rounded-lg px-3 py-2 outline-none"
                  />
                </div>
                <button
                  onClick={handleLogin}
                  className="w-full py-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-emerald-500 hover:to-green-600 text-white font-semibold transition-all shadow-lg"
                >
                  Login
                </button>
              </>
            )}

            <div className="text-sm text-center mt-4 text-gray-300">
              Don’t have an account?{" "}
              <a
                href={`/register?role=${role}`}
                className="text-blue-400 font-medium underline"
              >
                Register
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DualLoginPage;
