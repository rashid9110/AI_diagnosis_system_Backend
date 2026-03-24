const express = require('express');
const Modelrouter = express.Router();

const { isLoggedIn } = require('../validation/authValidation');
const { AI_Model_controller, getPatientsWithImagesController } = require('../controller/AI_Model_controller');
const uploader = require('../Middleware/multerMiddleware');
const multer = require('multer');


// ✅ Create diagnosis (protected)
Modelrouter.post(
    '/',
    isLoggedIn,
    uploader.single('image'),  // Middleware to handle file upload
    AI_Model_controller   // ✅ direct function
);

Modelrouter.get('/patients', isLoggedIn, getPatientsWithImagesController);


module.exports = Modelrouter;