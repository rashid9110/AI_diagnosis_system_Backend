const User = require("../schema/userSchema");

async function findUser(params) {
    try {
       const response = await User.findOne(params);
        return response; 
    } catch (error) {
        console.error("Error in findUser:", error);
        throw error; // Re-throw the error for further handling if needed
        
    }
}
async function CreateUser(UserDetails){
    try {
        const response=await User.create(UserDetails)
        return response;
    } catch (error) {
        console.log("unexpected error",error);
    }
}

module.exports={
    findUser,
    CreateUser
};