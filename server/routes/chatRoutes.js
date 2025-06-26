const express = require("express");
const router = express.Router();
const { chatWithOpenAI } = require("../controllers/chatCOntroller");
const protect = require("../middleware/authMiddleware");

router.post("/", protect(["doctor", "patient"]), chatWithOpenAI);

module.exports = router;
