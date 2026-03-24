
const patientService = require("../service/patientService");

// Create Patient
async function createPatient(req, res) {
  try {
    const userId = req.user.id;

    const patient = await patientService.createPatient(userId, req.body);

    res.status(201).json({
      success: true,
      message: "Patient created successfully",
      data: patient
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

// Get patient by ID
async function getPatientById(req, res) {
  try {
    const patient = await patientService.getPatientById(req.params.id);

    res.status(200).json({
      success: true,
      data: patient
    });

  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
}

// Update patient
async function updatePatient(req, res) {
  try {
    const patient = await patientService.updatePatient(
      req.params.id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Patient updated successfully",
      data: patient
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

// Delete patient
async function deletePatient(req, res) {
  try {
    await patientService.deletePatient(req.params.id);

    res.status(200).json({
      success: true,
      message: "Patient deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

module.exports = {
  createPatient,
  getPatientById,
  updatePatient,
  deletePatient
};