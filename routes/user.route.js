const express = require("express");

const userController = require("../controllers/user.controller")
//creating a route using express router
const userRouter = express.Router()


// get all users route
userRouter.get('/', userController.getAllUser);

// create new user route 
userRouter.post('/', userController.createNewUser);

//update a particular user detail(s)
userRouter.patch('/:userId', userController.updateUserDetails);

// delete a certain user from the DB
userRouter.delete('/:id', userController.deleteUser);


module.exports = userRouter