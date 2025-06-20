const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const 
{
  bookAppointment,
  getDoctorAppointments,
  updateAppointmentStatus,
} = require("../controllers/appointmentController");

// Patient books appointment
router.post("/", protect("patient"), bookAppointment);

// Doctor views appointments
router.get("/doctor", protect("doctor"), getDoctorAppointments);

// Doctor updates appointment status
router.put("/:id/status", protect("doctor"), updateAppointmentStatus);

module.exports = router;
