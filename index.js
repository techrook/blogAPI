//build dependencies
const express = require("express");
const passport = require('passport');
const app = express()
const bodyParser = require('body-parser')
require('dotenv').config();
require('./db').connectToDatabase();
require('./controllers/auth.controller')

//local dependencies 
const authRouter = require("./routes/auth.route")
const blogRouter = require('./routes/blog.route');
const userRouter = require('./routes/user.route')
const port = process.env.PORT ;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// authentication endpoint
app.use('/authentication', authRouter);

// blogs endpoint
app.use('/blogs', blogRouter); 

//users endpoint 
app.use('/users',passport.authenticate('jwt', { session: false }), userRouter);


//root page
app.use('/', (req,res)=>{
    return res.send({ status: true })
});


//ghost route
app.use('*', (req, res) => {
    return res.status(404).json({ message: ' not found' })
})

//starting server
app.listen(port, ()=>{
    console.log(`server started at localhost:${port}`)
})


module.exports = app;
