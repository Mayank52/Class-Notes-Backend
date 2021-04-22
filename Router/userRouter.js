const express = require('express');

const userRouter = express.Router();

userRouter.route('/:id').get(getUserData)
userRouter.route('/').post(createUser);

userRouter.route("/auth/google").get(login);
module.exports = userRouter;