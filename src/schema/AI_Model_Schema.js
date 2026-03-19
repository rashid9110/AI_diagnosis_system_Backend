const mongoose = require('mongoose');

const AI_Model_Schema = new mongoose.Schema(
{
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    patientName: {
        type: String,
        required: true,
        trim: true
    },

    imageUrl: {
        type: String,   // Cloudinary / S3 URL
        required: true
    },

    prediction: {
        type: String,   // e.g. Pneumonia / Normal
        required: true
    },

    confidence: {
        type: Number,   // e.g. 0.92
        required: true,
        min: 0,
        max: 1
    },

    heatmapUrl: {
        type: String   // optional but recommended
    },

    status: {
        type: String,
        enum: ['processing', 'completed', 'failed'],
        default: 'completed'
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Diagnosis', AI_Model_Schema);