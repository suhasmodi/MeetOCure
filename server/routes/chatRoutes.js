const express = require("express");
const router = express.Router();
const { chatWithFlaskAI } = require("../controllers/chatController");

router.post("/chat", chatWithFlaskAI);

module.exports = router;
