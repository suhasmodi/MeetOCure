const Appointment = require("../models/Appointment");
const User = require("../models/User");
const Slot = require("../models/Slot");

//Book an appointment 
const mongoose = require("mongoose");

const bookAppointment = async (req, res) => {
  try {
    const { doctorId, date, time, reason } = req.body;

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized: User info missing" });
    }

    if (!mongoose.Types.ObjectId.isValid(doctorId)) {
      return res.status(400).json({ message: "Invalid doctorId" });
    }

    if (!date || isNaN(new Date(date).getTime())) {
      return res.status(400).json({ message: "Invalid date" });
    }

    if (!time || typeof time !== "string") {
      return res.status(400).json({ message: "Invalid time" });
    }

    // 1. Validate doctor slot availability
    const slot = await Slot.findOne({ doctor: doctorId, date });
    if (!slot || !slot.availableSlots.includes(time)) {
      return res.status(400).json({ message: "Selected slot not available" });
    }

    // 2. Get patient info
    const patientDoc = await User.findById(req.user.id).select("name gender dob");
    if (!patientDoc) {
      return res.status(404).json({ message: "User not found" });
    }

    const age = Math.floor(
      (Date.now() - new Date(patientDoc.dob).getTime()) /
      (1000 * 60 * 60 * 24 * 365.25)
    );

    // 3. Create new appointment
    const appointment = new Appointment({
      patient: req.user.id,
      doctor: doctorId,
      date,
      time,
      reason,
      status: "Upcoming",
      patientInfo: {
        name: patientDoc.name,
        gender: patientDoc.gender,
        age,
        note: "Short medical note here"
      }
    });

    await appointment.save();

    // 4. Remove booked time from availableSlots
    slot.availableSlots = slot.availableSlots.filter((t) => t !== time);
    await slot.save();

    return res.status(201).json({ message: "Appointment booked successfully", appointment });
  } catch (err) {
    console.error("bookAppointment Error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


// Doctor views all appointment requests
const getDoctorAppointments = async (req, res) => {
  try {
    const doctorId = req.user.id; // Use authenticated doctor's ID
    const appointments = await Appointment.find({ doctor: doctorId })
      .populate("patient", "name gender dob phone")
      .sort({ date: 1 });

    res.json(appointments); // No need to wrap in { appointments } unless you're consistent
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
