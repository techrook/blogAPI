const mongoose = require("mongoose");

const blogModel = require('../models/blog.Models');// blog model

let count=0; // intial count vaule


// update readcouount function
async function countMiddleware(req,res,next){ 
    await blogModel.updateMany({}, { $inc: { read_count: +1 }} )
     if(next){
        
        next()
     }else{
        res.send('something went wrong')
     }
}

// get all blogs controller
const getAllBlogs =  async (req, res) =>{

    const page = parseInt(req.query.page);
    const order = req.query.order;
    const limit = 20;


    if (order === 'asc'){
        mySort = {
            readTime: 1,
            readCount: 1,
            timestamp: 1
        }
    }
    
    if (order === 'desc'){
        mySort = {
            readTime: 0,
            readCount: 0,
            timestamp: 0
        }
    }
    
    const startIndex = (page-1)*limit;

    // var blogState = blog.state
    await blogModel.find({state : "published"})
    .populate({path : "author", model: "users"})
    .limit(limit)
    .sort(order)
    .skip(startIndex)
    .then(blog => {
            res.status(200)
            res.send(blog)
                
    } ).catch(err => {
        res.status(404)
        res.send({
            message: "no blog(s) was found",
            data: err
        })
    })
};

// get only one blog by id
const getOneBlog = async (req, res) =>{
    const Id = req.params.id

    await blogModel.findById(Id).populate({path : "author", model: "users"})
    .then(blog =>{
        if ({state : 'published'}){

        res.status(200)
        res.send(blog)
        console.log(state)
        }else{
            res.status(404)
            res.send({
                message: "this blog has not been published yet",
            })
        }

    }).catch(err => {
        res.status(404)
        res.send({
            message: " blog not  found",
            data: err
        })
    })

   
}
     


// function to create new blog
const createBlog = (req,res) =>{
    const blogData = req.body;

    const authorId =  req.params.authorId;


    // // // author value
    const author = authorId;

    
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
    const blogId = req.params.id
    const blogUpdates = req.body;

    blogModel.findByIdAndUpdate(blogId, blogUpdates)
    .then(blog =>{
        res.status(202);
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

// publishblog from draft to published function
const  publishBlog =  (req, res) =>{
    const id = req.params.id

     blogModel.findByIdAndUpdate(id, {state : "published"})
    .then((blog) =>{
        res.status(202).send({
            message: "blog stated has sucessfully been updated",
            
        })
    })
    .catch((err) =>{
        res.status(500).send({
            message: "An error occured blog  not updated",
            data : err
        })
    })
}

async function search(req, res, next) {
    const search = req.query.search;
s
}

module.exports = {
    getAllBlogs,
    getOneBlog,
    createBlog,
    deleteBlog,
    updateBlog,
    publishBlog,
    countMiddleware,
    search

}