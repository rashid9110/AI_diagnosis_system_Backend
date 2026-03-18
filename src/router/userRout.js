const express=require('express');
const { userController } = require('../controller/user');


const UserRouter=express.Router();
// const { userController } = require('../controller/UserController');
UserRouter.post('/', userController);

module.exports = UserRouter;