
const { getPatientById } = require("../repository/patientRepo");
const AI_Model_service = require("../service/AI_Model_service");

async function AI_Model_controller(req, res) {
  try {
    console.log("API HIT");
    

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const userId = req.user.id;
    const patientId = req.body.patientId;
    console.log("USER ID:", userId);
    console.log("PATIENT ID:", patientId);

    console.log("FILE:", req.file);
    console.log("BODY:", req.body);

    const result = await AI_Model_service.createDiagnosis(
      userId,
      patientId,
      req.file.buffer,
      req.file.originalname
    );

    res.status(201).json({
      success: true,
      message: "Diagnosis created successfully",
      data: result,
    });

  } catch (error) {
    console.error("🔥 ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}


async function getPatientsWithImagesController(req, res) {
  try {
    const userId = req.user.id;

    const data = await AI_Model_service.getPatientsWithImages(userId);
    console.log("Fetched patient reports:", data);
    res.status(200).json({
      success: true,
      data
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

module.exports = {
  AI_Model_controller,
  getPatientsWithImagesController
};