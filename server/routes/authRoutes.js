const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer(); 
const {
  sendOtp,
  verifyOtp,
  register,
  checkPhone,
} = require("../controllers/authController");

router.post("/send-otp", sendOtp);       
router.post("/verify-otp", verifyOtp); 
router.post("/check-phone",checkPhone)  
router.post("/register",upload.single("certificate"), register);       

module.exports = router;
