const express = require("express");
const router = express.Router();
const { chatWithAI } = require("../controllers/chatController");
const protect = require("../middleware/authMiddleware");

// AI Chat (doctor or patient)
router.post("/", protect(["doctor", "patient"]), chatWithAI);

module.exports = router;
