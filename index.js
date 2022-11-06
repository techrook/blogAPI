//build dependencies
const express = require("express");
const passport = require('passport');
const app = express()
const bodyParser = require('body-parser')
require('dotenv').config();
require('./db').connect();
require('./controllers/auth.controller')

//local dependencies 
const authRouter = require("./routes/auth.route")
const blogRouter = require('./routes/blog.route');
const userRouter = require('./routes/user.route')
const port = process.env.PORT ;

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
    return res.json({ status: true })
});


//ghost route
app.use('*', (req, res) => {
    return res.status(404).send({ message: ' not found' })
})

//starting server
app.listen(3000, ()=>{
    console.log(`server started at localhost:${port}`)
})


module.exports = app;
