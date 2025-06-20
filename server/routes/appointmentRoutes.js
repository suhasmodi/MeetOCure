// 📁 routes/appointmentRoutes.js
const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
  bookAppointment,
  getDoctorAppointments,
  updateAppointmentStatus,
  getPatientAppointments,
} = require("../controllers/appointmentController");

// ✅ Patient books appointment
router.post("/", protect(["patient"]), bookAppointment);

// ✅ Patient views their own appointments (optional but useful)
router.get("/my", protect(["patient"]), getPatientAppointments);

// ✅ Doctor views all their appointments
router.get("/doctor", protect(["doctor"]), getDoctorAppointments);

// ✅ Doctor updates appointment status (accept, reject, complete, cancel)
router.put("/:id/status", protect(["doctor"]), updateAppointmentStatus);

module.exports = router;
