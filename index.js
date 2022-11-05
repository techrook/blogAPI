//build dependencies
const express = require("express");
const passport = require('passport');
const app = express()
const bodyParser = require('body-parser')
require('dotenv').config();
require('./db').connectToDatabase();
require('./controllers/auth.controller')

//local dependencies 
const authRouter = require("./routes/auth.route");
const blogRouter = require('./routes/blog.route');
const userRouter = require('./routes/user.route');

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


app.use('*', (req, res) => {
    return res.status(404).json({ message: ' not found' })
})


module.exports = app;
