const express = require("express");
const passport = require('passport');

//validators
const {addBlogValidatorMiddleware,updateBlogValidatorMiddleware}= require('../validator/blogValidator')
const blogController = require('../controllers/blog.Controllers');
const middleware = require('../middleware/blog.middleware')

const blogRouter = express.Router()

// get all blogs
blogRouter.get('/',blogController.countMiddleware,blogController.getAllBlogs );
// get one blog
blogRouter.get('/:id',blogController.countMiddleware,blogController.getOneBlog );
//create blog
blogRouter.post('/',passport.authenticate('jwt', { session: false }),addBlogValidatorMiddleware,blogController.createBlog );
// publish a blog
blogRouter.patch('/publishblog/:id', passport.authenticate('jwt', { session: false }),middleware.confirmBlogAuthor,blogController.publishBlog);
// update a blog
blogRouter.patch('/:id',passport.authenticate('jwt', { session: false }), middleware.confirmBlogAuthor,updateBlogValidatorMiddleware ,blogController.updateBlog);
// delete a blog
blogRouter.delete('/:id',passport.authenticate('jwt', { session: false }), middleware.confirmBlogAuthor, blogController.deleteBlog);

 
module.exports =  blogRouter 