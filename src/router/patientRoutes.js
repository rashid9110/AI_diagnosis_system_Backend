const express = require("express");
const PatientRouter = express.Router();

const { createPatient, getPatientById, updatePatient, deletePatient } = require("../controller/patientController");
const { isLoggedIn } = require("../validation/authValidation");

//  Create patient
PatientRouter.post("/", isLoggedIn, createPatient);



// Get patient by ID
PatientRouter.get("/:id", isLoggedIn, getPatientById);

// Update patient
PatientRouter.put("/:id", isLoggedIn, updatePatient);

// Delete patient
PatientRouter.delete("/:id", isLoggedIn, deletePatient);

module.exports = PatientRouter;