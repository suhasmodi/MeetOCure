const express = require("express");
const router = express.Router();
const product = require("../middleware/authMiddleware");
const {getDoctorProfile, updateDoctorProfile} = require("../controllers/doctorController");

router.get("/profile", product(["doctor"]), getDoctorProfile);

router.put("/profile", product(["doctor"]), updateDoctorProfile);;

module.exports = router;