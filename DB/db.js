const mongoose = require('mongoose');
const CONFIG = require('../config/config')

mongoose.set("strictQuery", false);

    const connect = (url) => {
        mongoose.connect(CONFIG.MONGODB_URL)
    
        mongoose.connection.on("connected", () => {
            console.log("Connected to MongoDB Successfully");
        });
    
        mongoose.connection.on("error", (err) => {
            console.log("An error occurred while connecting to MongoDB");
            console.log(err);
        });
    }


module.exports = {connect}