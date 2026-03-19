// const Diagnosis = require('../models/Diagnosis');

const AI_Model_Schema = require("../schema/AI_Model_Schema");

class AI_Model_repo {

    // ✅ Create new diagnosis
    async createDiagnosis(data) {
        return await AI_Model_Schema.create(data);
    }

    // ✅ Get all diagnoses (with optional filter)
    async getAllDiagnoses(filter = {}) {
        return await AI_Model_Schema.find(filter)
            .populate('userId', 'name email')
            .sort({ createdAt: -1 });
    }

    // ✅ Get diagnosis by ID
    async getDiagnosisById(id) {
        return await AI_Model_Schema.findById(id)
            .populate('userId', 'name email');
    }

    // ✅ Get diagnoses by user
    async getDiagnosesByUser(userId) {
        return await AI_Model_Schema.find({ userId })
            .sort({ createdAt: -1 });
    }

    // ✅ Update diagnosis
    async updateDiagnosis(id, updateData) {
        return await AI_Model_Schema.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );
    }

    // ✅ Delete diagnosis
    async deleteDiagnosis(id) {
        return await AI_Model_Schema.findByIdAndDelete(id);
    }
}

module.exports = new AI_Model_repo();