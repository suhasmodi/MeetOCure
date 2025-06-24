const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  createHospital,
  getAllHospitals,
  getHospitalById,
  filterHospitals,
} = require("../controllers/hospitalController");

// Doctor adds hospital
router.post("/", protect(["doctor"]), createHospital);

// All hospitals
router.get("/", getAllHospitals);

// Specific hospital + doctor info
router.get("/:id", getHospitalById);

router.get("/filter", filterHospitals);

module.exports = router;
