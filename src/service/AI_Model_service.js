const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

const cloudinary = require("../config/cloudinary");

const AI_Model_repo = require("../repository/AI_Model_repo");

class AI_Model_service {
  async createDiagnosis(userId, patientName, filePath) {
    try {
      // ✅ 1. Send file to AI API
      const formData = new FormData();
      formData.append("file", fs.createReadStream(filePath));

      const aiResponse = await axios.post(
        "https://gauravgupta8566-pneumonia-detection-api.hf.space/predict",
        formData,
        {
          headers: formData.getHeaders(),
        },
      );

      // ✅ 2. Extract AI result
      const prediction = aiResponse.data.diagnosis;
      const confidence = aiResponse.data.confidence; // FIX
      const heatmapBase64 = aiResponse.data.heatmap_image;

      // 1. Upload original image
      const upload = await cloudinary.uploader.upload(filePath);
      const imageUrl = upload.secure_url;

      // 2. Upload heatmap
      const heatmapUpload = await cloudinary.uploader.upload(heatmapBase64);
      const heatmapUrl = heatmapUpload.secure_url;

      // ✅ 4. Delete local file
      fs.unlinkSync(filePath);
      // 3. Save BOTH
      const data = {
        userId,
        patientName,
        imageUrl, // ✅ REQUIRED
        prediction,
        confidence,
        heatmapUrl,
      };

      return await AI_Model_repo.createDiagnosis(data);
    } catch (error) {
      console.log("AI Service Error:", error);
      throw new Error("Diagnosis failed");
    }
  }
}

module.exports = new AI_Model_service();
