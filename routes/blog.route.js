const express = require("express");
const passport = require('passport');

//validators
const blogValidator = require('../validator/blogValidator')
const blogController = require('../controllers/blog.Controllers');
const middleware = require('../middleware/blog.middleware')

const blogRouter = express.Router()
//blogvalidator malfunctioning 

blogRouter.get('/',blogController.countMiddleware,blogController.getAllBlogs );
blogRouter.get('/:id',blogController.countMiddleware,blogController.getOneBlog );
blogRouter.post('/:authorId',passport.authenticate('jwt', { session: false }),blogValidator,blogController.createBlog );
blogRouter.patch('/publishblog/:id', passport.authenticate('jwt', { session: false }),middleware.confirmBlogAuthor , blogController.publishBlog);
blogRouter.patch('/:id',passport.authenticate('jwt', { session: false }), middleware.confirmBlogAuthor, blogController.updateBlog);
blogRouter.delete('/:id',passport.authenticate('jwt', { session: false }), middleware.confirmBlogAuthor, blogController.deleteBlog);



 
module.exports =  blogRouter 