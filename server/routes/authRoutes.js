const express = require('express');
const router = express.Router();

const {
  SignupUser,
  loginUser,
  completeProfile,
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");


router.post('/signup', SignupUser);
router.post('/login', loginUser);


router.put('/complete-profile', protect(["doctor", "patient"]), completeProfile);

module.exports = router;
