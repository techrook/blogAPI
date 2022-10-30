const mongoose = require('mongoose');
require('dotenv').config();


connectToDatabase().catch(err => console.log(err));


async function connectToDatabase() {
mongoose.connect(process.env.MONGODB_URL) 
.then(()=>{
    console.log("database sucessfully connected")
})
.catch(()=>{
    console.log("An error occured database not connected ")
})




}

module.exports = {connectToDatabase}