const express = require("express");
const passport = require('passport');


const blogController = require('../controllers/blogControllers');

const blogRouter = express.Router()

blogRouter.get('/',blogController.countMiddleware,blogController.getAllBlogs );
blogRouter.get('/:id',blogController.countMiddleware,blogController.getOneBlog );
blogRouter.post('/:authorId',blogController.createBlog );
blogRouter.patch('/publishblog/:blogId', blogController.publishBlog);
blogRouter.patch('/:id',passport.authenticate('jwt', { session: false }), blogController.updateBlog);
blogRouter.delete('/:id',passport.authenticate('jwt', { session: false }), blogController.deleteBlog);



 
module.exports =  blogRouter 