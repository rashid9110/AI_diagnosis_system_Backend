// const Patient = require("../schema/patientSchema");

const Patient = require("../schema/Patient_Schema");

class PatientRepo {
  // ✅ Create patient
  async createPatient(data) {
    return await Patient.create(data);
  }

  // ✅ Get patient by ID
  async getPatientById(patientId) {
    return await Patient.findOne({ patientId });
  }

  // ✅ Update patient
  async updatePatient(id, updateData) {
    return await Patient.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
  }

  // ✅ Delete patient
  async deletePatient(id) {
    return await Patient.findByIdAndDelete(id);
  }
}

module.exports = new PatientRepo();
