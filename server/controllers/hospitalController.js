const Hospital = require("../models/Hospital");

const createHospital = async (req, res) => {
  try {
    const {
      name,
      location,
      distance,
      timeFromDevice,
      category,
      rating,
      reviews,
    } = req.body;

    const hospital = new Hospital({
      name,
      location,
      distance,
      timeFromDevice,
      category,
      rating,
      reviews,
      doctors: [req.user.id], // The logged-in doctor is added
    });

    await hospital.save();
    res.status(201).json({ message: "Hospital added Successfully in DB", hospital });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.find().populate("doctors", "name specialization");
    res.json(hospitals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getHospitalById = async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id).populate("doctors", "name email specialization experience");
    if (!hospital) return res.status(404).json({ message: "Hospital not found in DB" });
    res.json(hospital);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const filterHospitals = async(req, res) =>
{
  try
  {
      const
      {
          city,
          department
      } = req.query;

      const query = {};
      if(city) query["location.city"] = new RegExp(city, "i");
      if(department) query["departments"] = department;

      const hospitals = await Hospital.find(query).populate("doctors", "name specialization");

      res.status(200).json(hospitals);
  }

  catch(err)
  {
    res.status(500).json({messahe: err.message});
  }
};

module.exports = {
  createHospital,
  getAllHospitals,
  getHospitalById,
  filterHospitals
};
