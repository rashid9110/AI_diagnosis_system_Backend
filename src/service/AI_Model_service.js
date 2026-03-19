// // const diagnosisRepository = require('../repositories/diagnosisRepository');
// // const aiService = require('./aiService');

// const { cloudinary } = require("../config/cloudinary");
// const AI_Model_repo = require("../repository/AI_Model_repo");
// const fs = require("fs/promises");

// class AI_Model_service {
//   async createDiagnosis(userId, patientName, imageUrl) {
//     // Call AI service

//     if (imageUrl) {
//       try {
//         const cloudinaryResponse = await cloudinary.uploader.upload(imageUrl);
//         var productImage = cloudinaryResponse.secure_url;
//         await fs.unlink(process.cwd() + "/" + imageUrl);
//       } catch (error) {
//         console.log(error);
//         throw new InternalServerError();
//       }
//     }
//     // const result = await aiService.predictImage(imageUrl);

//     const data = {
//       userId,
//       patientName,
//       imageUrl,
//       prediction: "Normal",
//       confidence: 0.95,
//       heatmapUrl: "https://example.com/heatmap.jpg",
//     };

//     return await AI_Model_repo.createDiagnosis(data);
//   }

//   async getUserDiagnoses(userId) {
//     return await AI_Model_repo.getDiagnosesByUser(userId);
//   }
// }

// module.exports = new AI_Model_service();

const cloudinary = require("../config/cloudinary"); // ✅ FIXED
const AI_Model_repo = require("../repository/AI_Model_repo");
const fs = require("fs/promises");

class AI_Model_service {
  async createDiagnosis(userId, patientName, filePath) {
    let imageUrl = "";

    try {
      // ✅ Upload to Cloudinary
      const cloudinaryResponse = await cloudinary.uploader.upload(filePath);

      imageUrl = cloudinaryResponse.secure_url;

      // ✅ Delete local file
      await fs.unlink(filePath);

    } catch (error) {
      console.log("Cloudinary Error:", error);
      throw new Error("Image upload failed");
    }

    // TODO: Call AI service here later

    const data = {
      userId,
      patientName,
      imageUrl,   // ✅ correct (cloud URL)
      prediction: "Normal",
      confidence: 0.95,
      heatmapUrl: "https://example.com/heatmap.jpg",
    };

    return await AI_Model_repo.createDiagnosis(data);
  }

  async getUserDiagnoses(userId) {
    return await AI_Model_repo.getDiagnosesByUser(userId);
  }
}

module.exports = new AI_Model_service();