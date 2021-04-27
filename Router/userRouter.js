const express = require('express');
const {createUser, getUserData} = require('../Controller/userController')

const userRouter = express.Router();

userRouter.route('/').post(createUser);
userRouter.route('/:userid').get(getUserData);

module.exports = userRouter;