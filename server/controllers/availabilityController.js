const Availability = require("../models/Availability");

const setAvailability = async (req, res) => {
  try {
    const doctorId = req.user.id;
    const { days } = req.body; 

    
    const today = new Date().toISOString().slice(0, 10);
    if (days.some(day => day.date < today)) {
      return res.status(400).json({ message: "Cannot add slots for past dates" });
    }

  
    let availability = await Availability.findOne({ doctor: doctorId });

    if (!availability) {
      availability = await Availability.create({ doctor: doctorId, days });
    } else {
      
      days.forEach((newDay) => {
        const existingDay = availability.days.find((d) => d.date === newDay.date);
        if (existingDay) {
          // Overwrite slots for this date
          existingDay.slots = newDay.slots;
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
