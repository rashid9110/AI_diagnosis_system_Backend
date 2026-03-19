const AI_Model_service = require("../service/AI_Model_service");

// const diagnosisService = require('../services/diagnosisService');
async function AI_Model_controller (req, res){
    try {
        // Log to check the file path received
        console.log("File received:", req.file?.path);

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No file uploaded',
            });
        }
        const userId = req.user.id;
        const patientName = req.body.patientName;
        const imageUrl = req.file?.path;

        const result = await AI_Model_service.createDiagnosis(
            userId,
            patientName,
            imageUrl
        );

        res.status(201).json({
            success: true,
            message: 'Diagnosis created successfully',
            data: result,
        });

    } catch (error) {
        res.status(500).json({ error: "Failed" });
    }
};

module.exports = {
    AI_Model_controller
};