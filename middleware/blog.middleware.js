const mongoose = require("mongoose");

const blogModel = require('../models/blog.Models');// blog model


async function confirmBlogAuthor(req, res, next){
    const authorId = req.query.authorId
    const id = req.params.id
    const blogAuthor =blog.author 

    blogModel.findById(id)
    .then(blog =>{
        if(authorId === blogAuthor){
            next()
        }
    }).catch(err => {
        res.status(401)
        res.send({
            message: "your not the author this blog"
        })
        console.log(authorId)
        console.log(req.user)
    })
    next()
    
}

module.exports = {
    confirmBlogAuthor
}