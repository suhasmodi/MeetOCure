const Availability = require("../models/Availability");

const setAvailability = async (req, res) => {
  try {
    const doctorId = req.user.id;
    const { days } = req.body;

    
    const availability = await Availability.findOneAndUpdate(
      { doctor: doctorId },
      { doctor: doctorId, days },
      { new: true, upsert: true }
    );

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

module.exports = {
  setAvailability,
  getAvailability,
};
