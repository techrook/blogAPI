//build dependencies
const express = require("express");
const passport = require('passport');
const app = express()
const bodyParser = require('body-parser')
require('dotenv').config();
require('./db').connectToDatabase();
require('./controllers/auth')

//local dependencies 
const authRouter = require("./routes/auth")
const blogRouter = require('./routes/blog');
const userRouter = require('./routes/user')
const port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// authentication endpoint
app.use('/', authRouter);

// blogs endpoint
app.use('/blogs', blogRouter); 

//users endpoint 
app.use('/users', userRouter);


//root page
app.get('/', (req,res)=>{
    res.send('welcome to falseblog')
});




//starting server
app.listen(port, ()=>{
    console.log(`server started at localhost:${port}`)
})


