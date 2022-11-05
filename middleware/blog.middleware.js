const mongoose = require("mongoose");

const blogModel = require('../models/blog.Models');// blog model


async function confirmBlogAuthor(req, res, next){
    const authorId = req.query.authorId
    const blogId = req.params.blogId

    blogModel.findById(blogId)
    .then(blog =>{
        if(authorId === blog.author){
            next()
        }
    }).catch(err => {
        res.status(401)
        res.send({
            message: "your not the author this blog"
        })
    })
    next()
    
}

module.exports = {
    confirmBlogAuthor
}