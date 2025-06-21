const Appointment = require("../models/Appointment");
const User = require("../models/User");
const Slot = require("../models/Slot");

//Book an appointment (Patient only)
const bookAppointment = async (req, res) => {
  try {
    const { doctorId, date, time, reason } = req.body;

    // 1. Validate doctor slot availability
    const slot = await Slot.findOne({ doctor: doctorId, date });
    if (!slot || !slot.availableSlots.includes(time)) {
      return res.status(400).json({ message: "Selected slot not available" });
    }

    // Create new appointment
    const appointment = new Appointment({
      patient: req.user.id,
      doctor: doctorId,
      date,
      time,
      reason,
      status: "pending",
    });

    await appointment.save();

    // Remove booked time from availableSlots
    slot.availableSlots = slot.availableSlots.filter((t) => t !== time);
    await slot.save();

    res.status(201).json({ message: "Appointment booked successfully", appointment });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Doctor views all appointment requests
const getDoctorAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctor: req.user.id })
      .populate("patient", "name email")
      .sort({ date: 1 });

    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Doctor updates appointment status
const updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.status = status;
    await appointment.save();

    res.json({ message: "Status updated", appointment });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Patient views their appointments
const getPatientAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ patient: req.user.id })
      .populate("doctor", "name email specialization")
      .sort({ date: -1 });

    res.status(200).json({ appointments });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  bookAppointment,
  getDoctorAppointments,
  updateAppointmentStatus,
  getPatientAppointments,
};
