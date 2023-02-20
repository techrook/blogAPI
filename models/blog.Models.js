const mongoose = require('mongoose');


const Schema =  mongoose.Schema;


const BlogSchema = new Schema ({

    title: {
        type: String,
        require: true,
        unique: true
    },
    description:{
        type: String,
        require: true,
    },
    body : {
        type: String,
        require: true
    },
    tags:{
        type: String, enum: ['tech', 'sport', 'international','entertainment', 'others'],
        require: true
   },
    author: {
        type: mongoose.Types.ObjectId, 
        ref: "users"
    },
    state:{
        type: String,
        default: "draft",
        require: true 
    },
    read_count: {
        type: Number
    },
    read_time:{
        type: String
    },
    timestamp : {
        type: Date,
        default: Date.now
    },
    lastUpdateAt : {
        type: Date,
        default: Date.now
    },
})




module.exports = mongoose.model('blog',BlogSchema );