const mongoose = require("mongoose");
const validator = require("validator");

const patientSchema = new mongoose.Schema({

  name: {
    type: String,
    required: [true, "Patient name is required"],
    trim: true,
    minlength: [2, "Name must be at least 2 characters"],
    maxlength: [50, "Name cannot exceed 50 characters"]
  },

  age: {
    type: Number,
    min: [0, "Age cannot be negative"],
    max: [120, "Age cannot exceed 120"]
  },

  gender: {
    type: String,
    enum: {
      values: ["Male", "Female", "Other"],
      message: "Gender must be Male, Female, or Other"
    }
  },

  phone: {
    type: String,
    validate: {
      validator: function (value) {
        return validator.isMobilePhone(value, "en-IN");
      },
      message: "Invalid phone number"
    }
  },

  email: {
    type: String,
    lowercase: true,
    trim: true,
    validate: {
      validator: function (value) {
        return validator.isEmail(value);
      },
      message: "Invalid email address"
    }
  },

}, {
  timestamps: true
});

module.exports = mongoose.model("Patient", patientSchema);