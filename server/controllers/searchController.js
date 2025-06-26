const User = require("../models/User");
const Hospital = require("../models/Hospital");

const searchAll = async (req, res) => {
  try {
    const { keyword, category, location, minExperience } = req.query;

    const query = {};

    // Doctor Search Logic
    const doctorQuery = {
      role: "doctor",
      ...(keyword && {
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { specialization: { $regex: keyword, $options: "i" } },
        ],
      }),
      ...(minExperience && { experience: { $gte: parseInt(minExperience) } }),
    };

    // Hospital/Clinic Search Logic
    const hospitalQuery = {
      ...(keyword && {
        name: { $regex: keyword, $options: "i" },
      }),
      ...(category && { category }), // Hospital / Clinic / Special Care
    };

    // TODO: Add location filtering using coordinates or city (if present in schema)

    const doctors = await User.find(doctorQuery).select("-password");
    const hospitals = await Hospital.find(hospitalQuery);

    res.json({
      doctors,
      hospitals,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Search failed" });
  }
};

module.exports = { searchAll };
