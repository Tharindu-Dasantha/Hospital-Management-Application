const express = require("express");
const router = express.Router();
const Patient = require("../models/Patient");

// Get all patients
router.route("/").get(async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve patients" });
  }
});

// Add new patient
router.route("/add").post(async (req, res) => {
  try {
    const { name, age, gender } = req.body;

    // Data validation
    const validationError = validatePatient(name, age, gender);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const newPatient = new Patient({ name, age, gender });
    const savedPatient = await newPatient.save();
    res.status(500).json({ error: "Internal server error" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update patient data
router.route("/update/:id").post(async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, gender } = req.body;

    // Data validation
    const validationError = validatePatient(name, age, gender);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const patient = await Patient.findById(id);

    // Handle appointment not found
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    // Update patient details
    patient.name = name;
    patient.age = age;
    patient.gender = gender;

    // Save the updated patient
    await patient.save();

    // Return a success response with updated appointment data
    res.json({
      message: "Appointment updated!",
      updatedPatient: patient,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json9({ error: "Internal server error" });
  }
});

// Delete patient by ID
router.route("/delete/:id").delete(async (req, res) => {
    try {
        const { id } = req.params;
        const patient = await Patient.findById(id);

        if (!patient) {
            return res.status(404).json({ error: "Patient not found" });
        }
        res.json({ message: "Patient deleted successfully", deletedPatient });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
})

module.exports = router;
