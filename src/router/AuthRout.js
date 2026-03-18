//Resource user

const express=require('express');
const { login, logout } = require('../controller/Auth');
// const { login, logout } = require('../controllers/authController');

//we have to initailise a router object to add router in a new file
//Routers are used for segregating your routes in different modules
const authRouter=express.Router();

authRouter.post('/login',login);//this is the route registration
authRouter.post('/logout',logout);

module.exports=authRouter;//exporting the router