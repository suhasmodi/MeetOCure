const User = require("../models/User");
const Otp = require("../models/Otp");
const jwt = require("jsonwebtoken");

// Generate random 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Generate JWT
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Send OTP (Mocked, no third-party API)
const sendOtp = async (req, res) => {
  const { phone } = req.body;

  const otpCode = generateOTP();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

  await Otp.findOneAndUpdate(
    { phone },
    { phone, otp: otpCode, expiresAt },
    { upsert: true }
  );

  console.log(`OTP for ${phone}: ${otpCode}`); // Mock "send"

  res.json({ message: "OTP sent successfully (check console)" });
};

// Verify OTP and login/register
const verifyOtp = async (req, res) => {
  try {
    const { phone, otp, role } = req.body;

    const otpRecord = await Otp.findOne({ phone });

    if (!otpRecord || otpRecord.otp !== otp || otpRecord.expiresAt < new Date()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    let user = await User.findOne({ phone });

    if (!user) {
      user = await User.create({
        phone,
        role: role || "patient",
        isProfileComplete: false,
      });
    }

    const token = generateToken(user._id, user.role);

    await Otp.deleteOne({ phone });

    res.json({
      _id: user._id,
      name: user.name,
      phone: user.phone,
      role: user.role,
      isProfileComplete: user.isProfileComplete,
      token,
    });
  } catch (err) {
    console.error("OTP verification error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Register (doctor/patient)
const register = async (req, res) => {
  try {
    const { name, dob, gender, phone, address, certificateUrl, role } = req.body;

    // Validate required fields as needed

    const existing = await User.findOne({ phone });
    if (existing) return res.status(400).json({ message: "Phone already registered" });

    const user = await User.create({
      name,
      dob,
      gender,
      phone,
      address: role === "doctor" ? address : undefined,
      certificateUrl: role === "doctor" ? certificateUrl : undefined,
      role,
    });

    res.status(201).json({ message: "User registered. Please login using OTP." });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: err.message });
  }
};

// Check if phone is registered
const checkPhone = async (req, res) => {
  const { phone } = req.body;
  const user = await User.findOne({ phone });
  res.json({ exists: !!user });
};

module.exports = {
  sendOtp,
  verifyOtp,
  register,
  checkPhone,
};
