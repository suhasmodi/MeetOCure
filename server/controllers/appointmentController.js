const Appointment = require("../models/Appointment");
const Availability = require("../models/Availability");
const User = require("../models/User");
const Slot = require("../models/Slot");

//Book an appointment 
const bookAppointment = async (req, res) => {
  try {
    const { doctorId, date, time, reason } = req.body;

    // Step 1: Find doctor's availability for that date
    const availability = await Availability.findOne({ doctor: doctorId });
    if (!availability) {
      return res.status(404).json({ message: "No availability found for doctor" });
    }

    // Step 2: Find the day entry for the requested date
    const dayEntry = availability.days.find(d => d.date === date);
    if (!dayEntry || !dayEntry.slots.includes(time)) {
      return res.status(400).json({ message: "Selected slot not available" });
    }

    // Step 3: Build patient info
    const patientDoc = await User.findById(req.user.id).select("name gender dob");
    const age = Math.floor(
      (Date.now() - new Date(patientDoc.dob).getTime()) / (1000 * 60 * 60 * 24 * 365.25)
    );

    // Step 4: Save appointment
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
        note: "" // optional
      }
    });

    await appointment.save();

    // Step 5: Remove the booked time slot from availability
    dayEntry.slots = dayEntry.slots.filter(slot => slot !== time);
    await availability.save();

    return res.status(201).json({ message: "Appointment booked successfully", appointment });
  } catch (err) {
    console.error("Booking failed:", err);
    return res.status(500).json({ message: err.message || "Server error" });
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
