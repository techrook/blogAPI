//build dependencies
const express = require("express");
const passport = require('passport');
const bodyParser = require('body-parser')
const CONFIG = require('./config/config')

require('./controllers/auth.controller')

//local dependencies 
const logger = require('./logger/logger')
const authRouter = require("./routes/auth.route")
const blogRouter = require('./routes/blog.route');
const userRouter = require('./routes/user.route')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// authentication endpoint
app.use('/', authRouter);

// blogs endpoint
app.use('/v1/api/blogs', blogRouter); 

//users endpoint 
app.use('/users',passport.authenticate('jwt', { session: false }), userRouter);


//root page
app.get('/', (req,res)=>{
    logger.info('welcome to my blog')
    return res.json({ status: true })
    
});


 // error handler middleware
 app.use((err, req, res, next) => {
    logger.error(err.message)
     const errorStatus = err.status || 500
     res.status(errorStatus).send(err.message)
     next()
})




module.exports = app;
