const blogModel = require('../models/blogModels');// blog model
const mongoose = require("mongoose");
const toId = mongoose.Types.ObjectId;

let count=0; // intial count vaule

async function countMiddleware(req,res,next){ // update readcouount function

    await blogModel.update( {read_count : count++ })
     if(next){
        next()
     }else{
        res.send('something went wrong')
     }
    
}

// get all blogs controller
const getAllBlogs =  (req, res) =>{
    blogModel.find({}).populate('users')
    if({state: 1}){

        res.send("No Published blog")
    }else{
        try {
            res.status(200).send({
                data: blog
            })
            
        } catch (error) {
            res.status(404).json({
                message: "An error occured no blogs found",
                data: error
            })
        }
    }
}

const getOneBlog =  (req, res) =>{
    const Id = req.params.id

    blogModel.findById(Id)
    if({state: 1}){
        res.send("No Published blog")
    }else{
        try {
            res.status(200).send({
                data: blog
            })
            
        } catch (error) {
            res.status(404).json({
                message: "An error occured no blog found",
                data: error
            })
        }
    }
}
     


// function to create new blog
const createBlog = (req,res) =>{
    const blogData = req.body

    console.log(req.params)
    const authorId =  req.params.authorId
    //  console.log(authorId)

    // // // author value
    const author = authorId
    // author.save()
    console.log(author)
    
    // calculating for readtime
    const blogBody = blogData.blogInfo.body
    const blogBodyLenght = blogBody.length

    readTime = Math.round(blogBodyLenght/4%60)

    blogModel.create({blogInfo: blogData.blogInfo,
        author:author , read_time: `${readTime} minutes`, read_count: count
    })
        .then(blogData =>{
            res.status(201)
            res.send(blogData)
            

        }).catch(err =>{
        res.status(500)
        console.log(err)
        res.send({
            message: "An error occured blog  not posted",
            data : err
        })
    })
}

// delete blog function
const deleteBlog = (req, res) =>{
    const Id = req.params.id

    blogModel.findByIdAndDelete(Id)
    .then(() =>{
        res.status(202)
        res.send({
            message: "deleted sucessfully"
        })
    })
    .catch((err) =>{
        res.status(500)
        res.send({
            message: "An error occured blog  not deleted",
            data : err
        })
    })
}

// update blog function
const updateBlog = (req, res) =>{
    const blogId = req.params.blogId

    blogModel.findByIdAndUpdate(blogId, {"state": 2 })
    .then(blog =>{
        res.status(202)
        res.send({
            message: "blog has successfully been updated",
            data : blog
        })
    })
    .catch((err) =>{
        res.status(500)
        res.send({
            message: "An error occured blog  not updated",
            data : err
        })
    })
}

const publishBlog = (req, res) =>{
    const stateUpdate = req.body
    const blogId = req.params.blogId

    blogModel.findByIdAndUpdate(blogId, stateUpdate)
    .then((stateUpdate) =>{
        res.status(202)
        res.send(blog)
    })
    .catch((err) =>{
        res.status(500)
        res.send({
            message: "An error occured blog  not updated",
            data : err
        })
    })
}

module.exports = {
    getAllBlogs,
    getOneBlog,
    createBlog,
    deleteBlog,
    updateBlog,
    countMiddleware,
    publishBlog

}