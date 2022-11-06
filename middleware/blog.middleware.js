const mongoose = require("mongoose");

const blogModel = require('../models/blog.Models');// blog model


async function confirmBlogAuthor(req, res, next){
    const authorId = req.params.authorId;
    const id = req.params.id;
    
    blogModel.findById(id)
    .then(blog =>{
        const blogAuthor = blog.author
        if(authorId === blogAuthor){
            next()
        }
    }).catch(err => {
        res.status(401)
        res.send({
            message: "your not the author this blog"
        })
    })
    next();
    
}

module.exports = {
    confirmBlogAuthor
}

