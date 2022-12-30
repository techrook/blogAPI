const mongoose = require("mongoose");

const blogModel = require('../models/blog.Models');// blog model


async function confirmBlogAuthor(req, res, next){
    const id = req.params.id;
    const author = req.user._id 
    const authorToString = author.toString()
    
   await blogModel.findById(id)
    .then(blog =>{
        const blogAuthor = blog.author
        const stringfyBlogAuthor = blogAuthor.toString()
        if(authorToString === stringfyBlogAuthor){
            next()
        }
    }).catch(() => {
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

