const express = require('express');
const Modelrouter = express.Router();

const { isLoggedIn } = require('../validation/authValidation');
const { AI_Model_controller } = require('../controller/AI_Model_controller');
const uploader = require('../Middleware/multerMiddleware');
const multer = require('multer');


// ✅ Create diagnosis (protected)
Modelrouter.post(
    '/',
    isLoggedIn,
    uploader.single('XrayImage'),  // Middleware to handle file upload
    AI_Model_controller   // ✅ direct function
);

// // ✅ Get all diagnoses of logged-in user
// router.get(
//     '/my-diagnoses',
//     isLoggedIn,
//     AI_Model_controller.getUserDiagnoses 
// );

// // ✅ Get single diagnosis by ID
// router.get(
//     '/:id',
//     isLoggedIn,
//     diagnosisController.getDiagnosisById
// );

// // ✅ Delete diagnosis
// router.delete(
//     '/:id',
//     isLoggedIn,
//     diagnosisController.deleteDiagnosis
// );

module.exports = Modelrouter;