//mongoDB pasword :Rashid91101749
//mongoDB userName :alamr9110



const mongoose= require("mongoose");
const serverConfig = require("./serverConfig");


/**
 * The below function helps us to connect to a mongodb server
 */
async function connectDB() {
    try{
        await mongoose.connect(serverConfig.DB_URL)
        console.log("Successfully connected to the mongo db server...")
    }catch(error){
       console.log("Not able to connect to the mongodb server");
       console.log(error);
    }
}


module.exports = connectDB;