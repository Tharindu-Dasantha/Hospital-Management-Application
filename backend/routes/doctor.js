const express = require("express");
const router = express.Router();
const Doctor = require("../models/Doctor");

// Get all doctors
router.route("/").get(async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve doctors" });
  }
});

// Add new doctor
router.route("/add").post(async (req, res) => {
  try {
    const { name, speciality, availability } = req.body;

    // Data validation
    const validationError = validateDoctor(name, speciality, availability);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const newDoctor = new Doctor({ name, speciality, availability });
    const savedDoctor = await newDoctor.save();
    res.status(201).json(savedDoctor);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update doctor data
router.route("/update/:id").post(async (req, res) => {
  try {
    const { id } = req.params;
    const { name, speciality, availability } = req.body;

    // Data validation
    const validationError = validateDoctor(name, speciality, availability);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const doctor = await Doctor.findById(id);

    // Handle doctor not found
    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    // Update doctor details
    doctor.name = name;
    doctor.speciality = speciality;
    doctor.availability = availability;

    // Save the updated doctor
    await doctor.save();

    // Return a success response with updated doctor data
    res.json({
      message: "Doctor updated successfully",
      doctor: doctor,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete doctor by ID
router.route("/delete/:id").delete(async (req, res) => {
    try{
        const { id } = req.params;
        const deletedDoctor = await Doctor.findByIdAndDelete(id);

        if (!deletedDoctor) {
            return res.status(404).json({ error: "Doctor not found" });
        }
        res.json({ message: "Doctor deleted successfully", deletedDoctor });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
})

module.exports = router;