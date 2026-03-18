const { CreateUser, findUser } = require("../repository/UserRepo");

// const { findUser, CreateUse } = require("../repository/userRepo");
async function userRegistretion(UserDetails) {
     const response=await findUser({ email: UserDetails.email, mobileNumber: UserDetails.mobileNumber });
     console.log("Response from findUser:", response);
     if (response) {
        throw {response: "User already exists with this email or mobile number", status: 400};
     }
        
   //if user not exists then create a new user

   const newUser= await CreateUser({
        firstName: UserDetails.firstName,
        lastName: UserDetails.lastName,
        mobileNumber: UserDetails.mobileNumber,
        password: UserDetails.password,
        email: UserDetails.email,
        role: UserDetails.role
    });

    if (!newUser) {
        throw {response: "User not created", status: 400};
    }
    return newUser;
}

module.exports = {
    userRegistretion
};