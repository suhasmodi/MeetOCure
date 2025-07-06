const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    // References
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Embedded snapshot of patient data
    patientInfo: {
      name: { type: String, required: true },
      gender: { type: String, enum: ["male", "female", "other"], required: true },
      age: { type: Number, required: true },
      note: { type: String, default: "" },  // e.g. “Diabetic, allergic to penicillin”
    },

    // Appointment core
    date: { type: Date, required: true },
    time: { type: String, required: true },
    status: {
      type: String,
      enum: ["Upcoming", "Completed", "Cancelled"],
      default: "Upcoming",
    },
    reason: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
