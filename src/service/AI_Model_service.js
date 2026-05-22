// //

// const axios = require("axios");
// const FormData = require("form-data");
// const streamifier = require("streamifier");

// const cloudinary = require("../config/cloudinary");
// const AI_Model_repo = require("../repository/AI_Model_repo");
// // const { getPatientById } = require("../repository/patientRepo");
// const patientRepo = require("../repository/patientRepo");

// class AI_Model_service {
//   async createDiagnosis(userId, patientId, fileBuffer, fileName) {
//     try {
//       // 0. Fetch patient details from DB
//       console.log("Fetching patient with ID:", patientId);
//       const patient = await patientRepo.getPatientById(patientId);
//       console.log("Fetched patient:", patient);

//       if (!patient) {
//         throw new Error("Unauthorized patient");
//       }
//       // 1. Send to AI API
//       const formData = new FormData();

//       formData.append("file", fileBuffer, {
//         filename: fileName,
//         contentType: "image/jpeg",
//       });

//       const aiResponse = await axios.post(
//         "https://gauravgupta8566-pneumonia-diagnosis-api.hf.space/predict",
//         formData,
//         {
//           headers: {
//             ...formData.getHeaders(),
//           },
//           maxContentLength: Infinity,
//           maxBodyLength: Infinity,
//         },
//       );

//       console.log("AI RESPONSE:", aiResponse.data);

//       const prediction = aiResponse.data.diagnosis;
//       const confidence = aiResponse.data.confidence_score;
//       const heatmapBase64 = aiResponse.data.heatmap_image_base64;

//       // ✅ 2. Upload ORIGINAL image to Cloudinary
//       const imageUpload = await new Promise((resolve, reject) => {
//         const stream = cloudinary.uploader.upload_stream(
//           { folder: "ai-diagnosis" },
//           (error, result) => {
//             if (error) reject(error);
//             else resolve(result);
//           },
//         );
//         streamifier.createReadStream(fileBuffer).pipe(stream);
//       });

//       const imageUrl = imageUpload.secure_url;

//       // ✅ 3. Upload HEATMAP (base64)
//       const heatmapUpload = await cloudinary.uploader.upload(heatmapBase64);
//       const heatmapUrl = heatmapUpload.secure_url;

//       // ✅ 4. Save to DB
//       const data = {
//         userId,
//         patientId,
//         imageUrl,
//         prediction,
//         confidence,
//         heatmapUrl,
//         //snapshot
//         patientInfo: {
//           name: patient.name,
//           age: patient.age,
//           gender: patient.gender,
//           phone: patient.phone,
//         },
//       };

//       return await AI_Model_repo.createDiagnosis(data);
//     } catch (error) {
//       console.error("🔥 AI Service Error:", error);
//       throw new Error("Diagnosis failed");
//     }
//   }

//   async getPatientsWithImages(userId) {
//     try {
//       return await AI_Model_repo.getPatientsWithImages(userId);
//     } catch (error) {
//       throw new Error("Failed to fetch patient reports");
//     }
//   }
// }

// module.exports = new AI_Model_service();

const axios = require("axios");
const FormData = require("form-data");
const streamifier = require("streamifier");

const cloudinary = require("../config/cloudinary");
const AI_Model_repo = require("../repository/AI_Model_repo");
const patientRepo = require("../repository/patientRepo");

class AI_Model_service {
  async createDiagnosis(userId, patientId, fileBuffer, fileName) {
    try {
      // ================================
      // 1. Fetch Patient Details
      // ================================
      console.log("Fetching patient with ID:", patientId);

      const patient = await patientRepo.getPatientById(patientId);

      console.log("Fetched patient:", patient);

      if (!patient) {
        throw new Error("Unauthorized patient");
      }

      // ================================
      // 2. Send Image to AI API
      // ================================
      const formData = new FormData();

      formData.append("file", fileBuffer, {
        filename: fileName,
        contentType: "image/jpeg",
      });

      const aiResponse = await axios.post(
        "https://gauravgupta8566-pneumonia-diagnosis-api.hf.space/predict",
        formData,
        {
          headers: {
            ...formData.getHeaders(),
          },
          maxContentLength: Infinity,
          maxBodyLength: Infinity,
        }
      );

      console.log("AI RESPONSE:", aiResponse.data);

      // ================================
      // 3. Extract AI Response
      // ================================
      const prediction = aiResponse.data.diagnosis;

      const confidence = aiResponse.data.confidence_score;

      const heatmapBase64 =
        aiResponse.data.heatmap_image_base64;

      // ================================
      // 4. Upload Original Image
      // ================================
      const imageUpload = await new Promise(
        (resolve, reject) => {
          const stream =
            cloudinary.uploader.upload_stream(
              {
                folder: "ai-diagnosis",
              },
              (error, result) => {
                if (error) reject(error);
                else resolve(result);
              }
            );

          streamifier
            .createReadStream(fileBuffer)
            .pipe(stream);
        }
      );

      const imageUrl = imageUpload.secure_url;

      // ================================
      // 5. Upload Heatmap Image
      // ================================
      const heatmapDataUri =
        `data:image/jpeg;base64,${heatmapBase64}`;

      const heatmapUpload =
        await cloudinary.uploader.upload(
          heatmapDataUri,
          {
            folder: "ai-heatmaps",
          }
        );

      const heatmapUrl =
        heatmapUpload.secure_url;

      // ================================
      // 6. Save Diagnosis to Database
      // ================================
      const data = {
        userId,
        patientId,

        imageUrl,
        heatmapUrl,

        prediction,
        confidence,

        patientInfo: {
          name: patient.name,
          age: patient.age,
          gender: patient.gender,
          phone: patient.phone,
        },
      };

      const savedDiagnosis =
        await AI_Model_repo.createDiagnosis(data);

      console.log(
        "Diagnosis saved successfully"
      );

      return savedDiagnosis;

    } catch (error) {

      console.error(
        "🔥 AI Service Error:",
        error.response?.data || error.message
      );

      throw new Error("Diagnosis failed");
    }
  }

  // =====================================
  // Get Patients with Images
  // =====================================
  async getPatientsWithImages(userId) {
    try {
      return await AI_Model_repo.getPatientsWithImages(
        userId
      );
    } catch (error) {
      console.error(error);

      throw new Error(
        "Failed to fetch patient reports"
      );
    }
  }
}

module.exports = new AI_Model_service();