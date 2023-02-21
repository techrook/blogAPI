

const blogModel = require('../models/blog.Models');// blog model


 function confirmBlogAuthor(req, res, next){
    const id = req.params.id;
    const author = req.user._id 
    const authorToString = author.toString()
    console.log(req.user)

 blogModel.findById(id)
    .then(blog =>{
        const blogAuthor = blog.author
        const stringfyBlogAuthor = blogAuthor.toString()
        if(authorToString === stringfyBlogAuthor){
             next()
        }
    }).catch((err) => {
        res.status(401).send({
            message: "your not the author this blog",
            data : err
        })
    })
    
}


module.exports = {
    confirmBlogAuthor
}

