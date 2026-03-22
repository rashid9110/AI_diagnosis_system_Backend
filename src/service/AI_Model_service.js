// 

const axios = require("axios");
const FormData = require("form-data");
const streamifier = require("streamifier");

const cloudinary = require("../config/cloudinary");
const AI_Model_repo = require("../repository/AI_Model_repo");

class AI_Model_service {
  async createDiagnosis(userId, patientName, fileBuffer, fileName) {
    try {
      // ✅ 1. Send to AI API
      const formData = new FormData();
      formData.append("file", fileBuffer, fileName);

      const aiResponse = await axios.post(
        "https://gauravgupta8566-pneumonia-detection-api.hf.space/predict",
        formData,
        {
          headers: formData.getHeaders(),
        }
      );

      const prediction = aiResponse.data.diagnosis;
      const confidence = aiResponse.data.confidence;
      const heatmapBase64 = aiResponse.data.heatmap_image;

      // ✅ 2. Upload ORIGINAL image to Cloudinary
      const imageUpload = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "ai-diagnosis" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        streamifier.createReadStream(fileBuffer).pipe(stream);
      });

      const imageUrl = imageUpload.secure_url;

      // ✅ 3. Upload HEATMAP (base64)
      const heatmapUpload = await cloudinary.uploader.upload(heatmapBase64);
      const heatmapUrl = heatmapUpload.secure_url;

      // ✅ 4. Save to DB
      const data = {
        userId,
        patientName,
        imageUrl,
        prediction,
        confidence,
        heatmapUrl,
      };

      return await AI_Model_repo.createDiagnosis(data);

    } catch (error) {
      console.error("🔥 AI Service Error:", error);
      throw new Error("Diagnosis failed");
    }
  }
}

module.exports = new AI_Model_service();