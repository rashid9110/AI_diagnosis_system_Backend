const { userRegistretion } = require("../service/userService");

async function userController(req, res) {
  console.log("Inside userController", req.body);
  try {
    const userDetails = req.body;
    // console.log("User details received in controller:", userDetails);
    const newUser = await userRegistretion(userDetails);
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Error in userController:", error);
    res
      .status(error.status || 500)
      .json({ error: error.response || "Internal Server Error" });
  }
}

module.exports = {
  userController,
};
