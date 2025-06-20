const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { getDoctorProfile, updateDoctorProfile } = require("../controllers/doctorController");

router.get("/profile", protect(["doctor"]), getDoctorProfile);

router.put("/profile", protect(["doctor"]), updateDoctorProfile);

module.exports = router;
