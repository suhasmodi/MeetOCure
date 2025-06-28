import React, { useState, useEffect, useRef } from "react";
import { FaPhoneAlt, FaArrowLeft } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

const DualLoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("".padEnd(6, ""));
  const [timer, setTimer] = useState(60);
  const [role, setRole] = useState("doctor");
  const [showPopup, setShowPopup] = useState(false);
  const otpRefs = useRef([]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const roleParam = params.get("role");
    if (roleParam === "patient" || roleParam === "doctor") setRole(roleParam);
  }, [location.search]);

  useEffect(() => {
    let countdown;
    if (otpSent && timer > 0) {
      countdown = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(countdown);
  }, [otpSent, timer]);

  const handleSendCode = () => {
    if (!/^\d{10}$/.test(phone)) {
      alert("Enter valid 10-digit mobile number");
      return;
    }
    setOtpSent(true);
    setOtp("".padEnd(6, ""));
    setTimer(60);
    otpRefs.current[0]?.focus();
  };

  const handleOtpChange = (val, index) => {
    if (!/^\d?$/.test(val)) return;
    const newOtp = otp.split("");
    newOtp[index] = val;
    setOtp(newOtp.join(""));
    if (val && index < 5) otpRefs.current[index + 1]?.focus();
    if (!val && index > 0) otpRefs.current[index - 1]?.focus();
  };

  const handleVerify = () => {
    if (otp.length === 6 && /^\d{6}$/.test(otp)) {
      setShowPopup(true);
      setTimeout(() => {
        navigate(`/${role}-dashboard`);
      }, 3000);
    } else {
      alert("Enter valid 6-digit OTP");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    otpSent ? handleVerify() : handleSendCode();
  };

  return (
    <div className="min-h-screen bg-white font-[Poppins] flex items-center justify-center px-4 relative">
      {/* Back Arrow */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 text-2xl text-[#004B5C] hover:text-[#003246] transition"
      >
        <FaArrowLeft />
      </button>

      {/* Center Box */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white text-center"
        autoComplete="off"
      >
        <div className="flex flex-col items-center mb-10">
          <img src="/assets/logo.png" alt="Logo" className="w-28 h-28 mb-6" />
          <h1 className="text-4xl font-bold text-[#004B5C]">
            {otpSent ? "Verify Code" : "Hi, Welcome!"}
          </h1>
          <p className="text-base text-[#2D3A3A] mt-3 px-4">
            {otpSent
              ? "Enter the code we just sent you on your Mobile Number"
              : "Enter your Mobile Number, we will send you a verification code."}
          </p>
        </div>

        {!otpSent ? (
          <>
            <label className="block text-left text-sm font-semibold mb-2">
              Mobile Number
            </label>
            <div className="flex items-center border border-[#7A869A] rounded-xl px-4 py-3 mb-6">
              <FaPhoneAlt className="text-[#7A869A] mr-3" />
              <input
                type="tel"
                placeholder="Enter Your Mobile Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full outline-none bg-transparent text-gray-700 placeholder-gray-500 text-base"
              />
            </div>
            <button
              type="submit"
              className={`w-full py-3 rounded-full font-semibold text-lg ${
                phone.length === 10
                  ? "bg-[#004B5C] text-white hover:bg-[#003246]"
                  : "bg-gray-300 text-white cursor-not-allowed"
              } transition`}
              disabled={phone.length !== 10}
            >
              Send Code
            </button>
          </>
        ) : (
          <>
            <div className="flex justify-between gap-3 mb-6">
              {[...Array(6)].map((_, idx) => (
                <input
                  key={idx}
                  type="text"
                  maxLength={1}
                  value={otp[idx]}
                  onChange={(e) => handleOtpChange(e.target.value, idx)}
                  ref={(el) => (otpRefs.current[idx] = el)}
                  className="w-14 h-14 border border-[#004B5C] rounded text-center text-2xl font-semibold outline-none"
                />
              ))}
            </div>
            <button
              type="submit"
              className={`w-full py-3 rounded-full font-semibold text-lg ${
                /^\d{6}$/.test(otp)
                  ? "bg-[#004B5C] text-white hover:bg-[#003246]"
                  : "bg-gray-300 text-white cursor-not-allowed"
              } transition`}
              disabled={!/^\d{6}$/.test(otp)}
            >
              Verify
            </button>

            <div className="text-center text-sm text-gray-500 mt-4">
              Didn’t get the Code?{" "}
              {timer > 0 ? (
                <span className="text-gray-600">
                  Time Left: 00:{String(timer).padStart(2, "0")}
                </span>
              ) : (
                <span
                  onClick={handleSendCode}
                  className="text-[#004B5C] font-semibold underline cursor-pointer"
                >
                  Resend
                </span>
              )}
            </div>
          </>
        )}

        {/* Registration Link */}
        <div className="text-sm text-center mt-6">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate(`/register?role=${role}`)}
            className="text-[#004B5C] font-semibold underline cursor-pointer"
          >
            Register here
          </span>
        </div>
      </form>

      {/* Success Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-[2rem] px-10 py-8 max-w-sm w-full text-center shadow-2xl">
            <img
              src="/assets/popups/success.png"
              alt="Success"
              className="w-28 h-28 object-contain mx-auto mb-6"
            />
            <h3 className="text-[22px] font-bold text-[#1F2A37] mb-2">
              Login Successful
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Login successful! Redirecting...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DualLoginPage;
