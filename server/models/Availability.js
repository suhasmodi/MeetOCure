const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema(
{
  startTime: { type: String, required: true }, 
  endTime: { type: String, required: true },   
});

const availabilitySchema = new mongoose.Schema(
{
  doctor: 
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },
  days: 
  [
    {
      day: 
      {
        type: String,
        enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        required: true
      },
      slots: [slotSchema] 
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Availability", availabilitySchema);
