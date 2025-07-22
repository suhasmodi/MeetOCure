const express = require("express");
const router = express.Router();
const { chatWithOpenAI } = require("../controllers/chatCOntroller");

// Removed `protect`
router.post("/", chatWithOpenAI);

module.exports = router;
