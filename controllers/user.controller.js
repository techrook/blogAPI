const UserModel = require("../models/user.models")

const createNewUser = (req, res) =>{
    const user= req.body

    UserModel.create(user)
        .then(user =>{
            res.status(201)
            res.send(user)
        })
        .catch(err => {
            res.status(500)
            res.json({
                message: 'user not created something went wrong',
                data: err
            })
        })
}

const updateUserDetails = (req, res) =>{
    const userUpdate = req.body
    const id = req.params.userId

    UserModel.findByIdAndUpdate(id, userUpdate)
        .then(userUpdate => {
            res.status(202)
            res.json({
                message: "your details have successfully been updated",
                data: userUpdate
            })
        } )
        .catch(err => {
            res.status(500)
            res.json({
                message: 'user not updated something went wrong',
                data: err
            })
        })
}

const deleteUser = (req, res) =>{
    const Id = req.params.id

    UserModel.findByIdAndDelete(Id)
    .then(() =>{
        res.status(202)
        res.send({
            message: "deleted sucessfully"
        })
    })
    .catch((err) =>{
        res.status(500)
        res.send({
            message: "An error occured user not deleted",
            data : err
        })
    })
}

const getAllUser = (req, res) =>{
    UserModel.find({})
    .then((users) =>{
        res.status(200)
        res.send(users)
    })
    .catch((err) =>{
        res.status(404)
        res.send({
            message: "no user found",
            data : err
        })
    })
}


module.exports = {
    getAllUser,
    updateUserDetails,
    deleteUser,
    createNewUser
}