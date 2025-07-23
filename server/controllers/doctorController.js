const User = require("../models/User");

const getDoctorProfile = async (req, res) =>
{
    try
    {
        const doctor = await User.findById(req.user.id).select("-password");
        if(!doctor || doctor.role !== "doctor")
        {
            return res.status(404).json({mesaage: "Doctor not found"});
        }
        res.json(doctor);
    }
    catch (error)
    {
        res.status(500).json({message: error.message});
    }
};

const updateDoctorProfile = async (req, res) => {
  try {
    const doctorId = req.user.id;
    const { name, phone, dob, gender, photo } = req.body;

    // Update the user in the DB
    const updated = await User.findByIdAndUpdate(
      doctorId,
      {
        name,
        phone,
        dob,
        gender,
        photo,
        isProfileComplete: !!(name && phone && dob && gender), // update as per your logic
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.json({
      message: "Profile updated",
      user: {
        _id: updated._id,
        name: updated.name,
        phone: updated.phone,
        dob: updated.dob,
        gender: updated.gender,
        photo: updated.photo,
        isProfileComplete: updated.isProfileComplete,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const getFilteredDoctors = async (req, res) =>
{
    try
    {
        const 
        {
            specilaization,
            minExperience,
        } = req.query;

        const query = {
            role: "doctor",
            isProfileComplete: true,
        };

        if(specilaization)
        {
            query.specialization = { $regex: specilaization, $options: "i" };
        }

        if(minExperience)
        {
            query.experince = { $gte: parseInt(minExperience) };
        }

        const doctors = await User.find({ role: "doctor" /* plus other filters */ }).select("-password");
        res.status(200).json(doctors);
    }

    catch(err)
    {
        res.status(500).json({ message: err.message});
    }
};

module.exports = {
  getDoctorProfile,
  updateDoctorProfile,
  getFilteredDoctors,
};