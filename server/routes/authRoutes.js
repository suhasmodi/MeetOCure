const express = require("express");
const router = express.Router();
const {
  sendOtp,
  verifyOtp,
  register,
  checkPhone,
} = require("../controllers/authController");

router.post("/send-otp", sendOtp);        // Send OTP to phone
router.post("/verify-otp", verifyOtp); 
router.post("/check-phone",checkPhone)   // Verify OTP and login
router.post("/register", register);       // Register doctor or patient

module.exports = router;
