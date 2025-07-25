const Appointment = require("../models/Appointment");
const Availability = require("../models/Availability");
const User = require("../models/User");
const Slot = require("../models/Slot");

const bookAppointment = async (req, res) => {
  try {
    const { doctorId, date, time, reason } = req.body;
    if (!doctorId || !date || !time) {
      return res.status(400).json({ message: "doctorId, date, and time are required" });
    }
    const requestedDate = new Date(date).toISOString().slice(0, 10);
    const availability = await Availability.findOne({ doctor: doctorId });
    if (!availability) {
      return res.status(404).json({ message: "No availability found for doctor" });
    }
    const dayEntry = availability.days.find(d => d.date === requestedDate);
    if (!dayEntry || !dayEntry.slots.includes(time)) {
      return res.status(400).json({ message: "Selected slot not available" });
    }
    const patientDoc = await User.findById(req.user.id).select("name gender dob");
    if (!patientDoc) {
      return res.status(404).json({ message: "Patient user not found" });
    }
    const age = Math.floor((Date.now() - new Date(patientDoc.dob).getTime()) / (1000 * 60 * 60 * 24 * 365.25));
    const appointment = new Appointment({
      patient: req.user.id,
      doctor: doctorId,
      date: requestedDate,
      time,
      reason,
      status: "Upcoming",
      patientInfo: {
        name: patientDoc.name,
        gender: patientDoc.gender,
        age,
        note: ""
      }
    });
    await appointment.save();
    dayEntry.slots = dayEntry.slots.filter(slot => slot !== time);
    await availability.save();
    const slotDoc = await Slot.findOne({ doctor: doctorId, date: requestedDate });
    if (slotDoc) {
      slotDoc.availableSlots = slotDoc.availableSlots.filter(slot => slot !== time);
      await slotDoc.save();
    }
    return res.status(201).json({ message: "Appointment booked successfully", appointment });
  } catch (err) {
    console.error("Booking failed:", err);
    return res.status(500).json({ message: err.message || "Server error" });
  }
};

const getDoctorAppointments = async (req, res) => {
  try {
    const doctorId = req.user.id;
    const appointments = await Appointment.find({ doctor: doctorId })
      .populate("patient", "name gender dob phone")
      .sort({ date: 1 });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

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
