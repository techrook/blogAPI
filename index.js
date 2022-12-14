//build dependencies
const express = require("express");
const passport = require('passport');
const app = express()
const bodyParser = require('body-parser')
require('dotenv').config();
require('./db').connect();
require('./controllers/auth.controller')

//local dependencies 
const logger = require('./logger/logger')
const authRouter = require("./routes/auth.route")
const blogRouter = require('./routes/blog.route');
const userRouter = require('./routes/user.route')
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// authentication endpoint
app.use('/', authRouter);

// blogs endpoint
app.use('/blogs', blogRouter); 

//users endpoint 
app.use('/users',passport.authenticate('jwt', { session: false }), userRouter);


//root page
app.get('/', (req,res)=>{
    logger.info('welcome to my blog')
    return res.json({ status: true })
    
});


//ghost route
app.use('*', (req, res) => {
    logger.error(err.message);
    return res.status(404).send({ message: ' not found' })
})

//starting server
app.listen(port, ()=>{
    logger.info(`server started at localhost:${port}`)
})


module.exports = app;
