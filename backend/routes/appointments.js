const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");

// GET all appointments
router.route("/").get(async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve appointments" });
  }
});

// Add new appointment
router.route("/add").post(async (req, res) => {
  try {
    const { patientName, doctorName, date } = req.body;

    // Data validation
    const validationError = validateAppointment(patientName, doctorName, date);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const newAppointment = new Appointment({ patientName, doctorName, date });
    const savedAppointment = await newAppointment.save();
    res.status(201).json(savedAppointment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal sever error" });
  }
});

// Update appointment data
router.route("/update/:id").post(async (req, res) => {
  try {
    const { id } = req.params;
    const { patientName, doctorName, date } = req.body;

    // Data validation
    const validationError = validateAppointment(patientName, doctorName, date);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const appointment = await Appointment.findById(id);

    // Handle appointment not found
    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    // Update appointment details
    appointment.patientName = patientName;
    appointment.doctorName = doctorName;
    appointment.date = date;

    // Save the updated appointment
    await appointment.save();

    // Return a success response with updated appointment data
    res.json({
      message: "Appointment updated!",
      updaetdAppointment: appointment,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete appointment
router.route("delete/:id").delete(async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAppointment = await Appointment.findByIdAndDelete(id);

    if (!deletedAppointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }
    res.json({ message: "Appointment deleted!", deletedAppointment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;