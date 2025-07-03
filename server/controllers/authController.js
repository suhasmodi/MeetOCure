const User = require("../models/User");
const Otp = require("../models/Otp");
const jwt = require("jsonwebtoken");
const twilio = require("twilio");

// Generate random 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Generate JWT
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const OTP_COOLDOWN = 60 * 1000; // 60 seconds
const OTP_EXPIRY = 5 * 60 * 1000; // 5 minutes

const sendOtp = async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) {
      return res.status(400).json({ message: "Phone number is required" });
    }

    // Check for recent OTP
    const existingOtp = await Otp.findOne({ phone });
    if (existingOtp && existingOtp.expiresAt - OTP_EXPIRY + OTP_COOLDOWN > Date.now()) {
      return res.status(429).json({ message: "OTP already sent. Please wait before requesting again." });
    }

    const otpCode = generateOTP();
    const expiresAt = new Date(Date.now() + OTP_EXPIRY);

    // Save or update OTP in DB
    await Otp.findOneAndUpdate(
      { phone },
      { phone, otp: otpCode, expiresAt, attempts: 0 },
      { upsert: true }
    );

    // Send OTP via Twilio
    await client.messages.create({
      body: `Your MeetOCure OTP is: ${otpCode}`,
      from: process.env.TWILIO_PHONE,
      to: `+91${phone}`
    });

    res.json({ message: "OTP sent successfully" });
  } catch (err) {
    console.error("Twilio error:", err.message);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { phone, otp } = req.body;
    const otpRecord = await Otp.findOne({ phone });

    if (!otpRecord) {
      return res.status(400).json({ message: "No OTP request found for this number." });
    }

    // Block after 5 failed attempts
    if (otpRecord.attempts >= 5) {
      await Otp.deleteOne({ phone });
      return res.status(429).json({ message: "Too many failed attempts. Please request a new OTP." });
    }

    if (otpRecord.otp !== otp || otpRecord.expiresAt < new Date()) {
      await Otp.updateOne({ phone }, { $inc: { attempts: 1 } });
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const user = await User.findOne({ phone });

    // OTP is valid, delete it
    await Otp.deleteOne({ phone });

    if (!user) {
      return res.json({ verified: true, message: "OTP verified. Please complete registration." });
    }

    const token = generateToken(user._id, user.role);

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
    const { name, dob, gender, phone, address, role } = req.body;

    let certificateUrl = undefined;
    if (role === "doctor" && req.file) {
      certificateUrl = req.file.path; 
    }

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
