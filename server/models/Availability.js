const mongoose = require("mongoose");

const availabilitySchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },
    days: [
      {
        date: { type: String, required: true }, // e.g., "2025-06-13"
        slots: [String] // e.g., ["9:00 AM", "9:30 AM"]
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Availability", availabilitySchema);
