const express = require("express");
const connectDB = require("./config/connectDB");
const UserRouter = require("./router/userRout");
const authRouter = require("./router/AuthRout");
const cookieParser = require("cookie-parser");
// const { URL } = require("./config/   serverConfig");
const cors = require("cors");
// const { URL } = require("./config/serverConfig");
const Modelrouter = require("./router/AI_Model");

const app = express();

// app.use(cookieParser());
// Middleware
// app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));   // ✅ only keep this
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.text({ limit: "50mb" }));   // optional if you send text payloads
app.use(cookieParser());

app.use(cors({
  origin: "https://ai-diagnosis.netlify.app",            // frontend URL e.g. "http://localhost:5173"
  credentials: true 
}));
 

app.use("/User",UserRouter);
app.use("/login",authRouter);
app.use("/AI_Model",Modelrouter);

// test route
app.get("/", (req, res) => {
  res.send("hello world");
});     
 


const PORT = 5000;   
app.listen(PORT, async () => {
  await connectDB();
  console.log(`✅ Server running on port ${PORT}`);
});

