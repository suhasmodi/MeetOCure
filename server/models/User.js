const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    dob: {
      type: Date,
      required: true,
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
      match: [/^[6-9]\d{9}$/, "Please enter a valid Indian mobile number"],
    },

    role: {
      type: String,
      enum: ["doctor", "patient"],
      required: true,
    },

    // Fields for doctors only
    address: {
      type: String,
      required: function () {
        return this.role === "doctor";
      },
    },

    certificateUrl: {
      type: String, // File or cloud link
      required: function () {
        return this.role === "doctor";
      },
    },

    specialization: {
      type: String,
      default: "",
    },

    experience: {
      type: Number,
      default: 0,
    },

    isProfileComplete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Optional index for performance if filtering by role/specialization
userSchema.index({ role: 1, specialization: 1 });

module.exports = mongoose.model("User", userSchema);
