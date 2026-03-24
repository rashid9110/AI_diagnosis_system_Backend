const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name is required"],
      minlength: [2, "First name must be atleast 2 character long"],
      lowercase: true,
      trim: true, //if the given extra spaces then it will automatically remove it
      maxlength: [
        20,
        "First name should be less then or equal to 20 character",
      ],
    },
    lastName: {
      type: String,
      lowercase: true,
      trim: true, //if the given extra spaces then it will automatically remove it
      maxlength: [
        20,
        "First name should be less then or equal to 20 character",
      ],
    },
    mobileNumber: {
      type: String,
      minlength: [10, "Phone number should be at least 10 digits"],
      maxlength: [12, "Phone number should be at most 12 digits"],
      trim: true,
      unique: [true, "Phone number is already in use"],
      required: [true, "Phone number is required"],
    },

    password: {
      type: String,
      required: [true, "Password should be provide"],
      minlength: [6, "Password should be minimum 6 character long"],
    },
    email: {
      type: String,
      required: [true, "Email ID should be provide"],
      unique: [true, "Email is already in use"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function () {
  const hashPassword = await bcrypt.hash(this.password, 10);
  this.password = hashPassword;
});

const User = mongoose.model("DemoUser2", userSchema);
module.exports = User;
