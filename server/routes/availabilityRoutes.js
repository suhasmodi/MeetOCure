const express = require("express");
const router = express.Router();
const { setAvailability, getAvailability } = require("../controllers/availabilityController");
const protect = require("../middleware/authMiddleware");

// Doctor sets availability
router.post("/", protect("doctor"), setAvailability);

// Patient can fetch doctor’s availability
router.get("/:doctorId", getAvailability);

module.exports = router;
