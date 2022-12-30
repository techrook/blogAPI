const mongoose = require("mongoose");
const  Passport  = require('passport');

const blogModel = require('../models/blog.Models');// blog model


async function confirmBlogAuthor(req, res, next){
    const id = req.params.id;
    const author = req.user._id 
    const authorToString = author.toString()
    console.log(req.user)

   await blogModel.findById(id)
    .then(blog =>{
        const blogAuthor = blog.author
        const stringfyBlogAuthor = blogAuthor.toString()
        if(authorToString === stringfyBlogAuthor){
            next()
        }
    }).catch((err) => {
        res.status(401)
        res.send({
            message: "your not the author this blog",
            data : err
        })
    })
    next();
    
}

module.exports = {
    confirmBlogAuthor
}

