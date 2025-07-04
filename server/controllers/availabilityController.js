const Availability = require("../models/Availability");

const setAvailability = async (req, res) => {
  try {
    const doctorId = req.user.id;
    const { days } = req.body; // days is an array with one or more new days

    // Prevent adding slots for past dates
    const today = new Date().toISOString().slice(0, 10);
    if (days.some(day => day.date < today)) {
      return res.status(400).json({ message: "Cannot add slots for past dates" });
    }

    // Fetch existing availability
    let availability = await Availability.findOne({ doctor: doctorId });

    if (!availability) {
      // No previous availability, create new
      availability = await Availability.create({ doctor: doctorId, days });
    } else {
      // Merge: update slots for existing date or add new date
      days.forEach((newDay) => {
        const existingDay = availability.days.find((d) => d.date === newDay.date);
        if (existingDay) {
          // Merge slots, avoid duplicates
          existingDay.slots = Array.from(new Set([...existingDay.slots, ...newDay.slots]));
        } else {
          // Add new date
          availability.days.push(newDay);
        }
      });
      await availability.save();
    }

    res.status(200).json({ message: "Availability set", availability });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAvailability = async (req, res) => {
  try {
    const doctorId = req.params.doctorId;

    const availability = await Availability.findOne({ doctor: doctorId });

    if (!availability) {
      return res.status(404).json({ message: "No availability set yet" });
    }

    res.status(200).json(availability);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteAvailabilityDate = async (req, res) => {
  const doctorId = req.user.id;
  const { date } = req.params;
  const availability = await Availability.findOne({ doctor: doctorId });
  if (!availability) return res.status(404).json({ message: "No availability found" });
  availability.days = availability.days.filter((d) => d.date !== date);
  await availability.save();
  res.json({ message: "Deleted", availability });
};

module.exports = {
  setAvailability,
  getAvailability,
  deleteAvailabilityDate,
};
