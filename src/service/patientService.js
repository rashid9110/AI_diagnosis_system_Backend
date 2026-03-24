
const patientRepo = require("../repository/patientRepo");

class PatientService {

  async createPatient(userId, data) {
    try {
      data.doctorId = userId;

      return await patientRepo.createPatient(data);
    } catch (error) {
      console.error("🔥 Service Error:", error);
      throw new Error("Failed to create patient");
    }
  }

  async getPatientById(id) {
    try {
      return await patientRepo.getPatientById(id);
    } catch (error) {
      throw new Error("Patient not found");
    }
  }

  async updatePatient(id, data) {
    try {
      return await patientRepo.updatePatient(id, data);
    } catch (error) {
      throw new Error("Failed to update patient");
    }
  }

  async deletePatient(id) {
    try {
      return await patientRepo.deletePatient(id);
    } catch (error) {
      throw new Error("Failed to delete patient");
    }
  }
}

module.exports = new PatientService();