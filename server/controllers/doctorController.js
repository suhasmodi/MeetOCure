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

const updateDoctorProfile = async (req, res) => 
    {
        try 
        {
            const doctor = await User.findById(req.user.id);
            if (!doctor || doctor.role !== "doctor") 
            {
                return res.status(404).json({ message: "Doctor not found" });
            }

            const { specialization, experience, phone, age, gender, address } = req.body;

            if (specialization) doctor.specialization = specialization;
            if (experience) doctor.experience = experience;
            if (phone) doctor.phone = phone;
            if (age) doctor.age = age;
            if (gender) doctor.gender = gender;
            if (address) doctor.address = address;

            await doctor.save();
            res.json({ message: "Profile updated successfully" });
        } 
        catch (error) 
        {
            res.status(500).json({ message: error.message });
        }
};

module.exports = {
  getDoctorProfile,
  updateDoctorProfile,
};