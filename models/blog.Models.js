const mongoose = require("mongoose");
const Users = require("./user.models");

const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  blogInfo: {
    title: {
      type: String,
      require: true,
      unique: true,
    },
    description: {
      type: String,
      require: true,
    },

    body: {
      type: String,
      require: true,
    },
    tags: {
      type: String,
      enum: ["tech", "sport", "international", "others"],
    },
  },
  author: {
    type: mongoose.Types.ObjectId,
    ref: "users",
  },
  state: {
    type: String,
    default: "draft",
  },
  read_count: {
    type: Number,
  },
  read_time: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

// BlogSchema.index({author: 'text', title: 'text', tags: 'text'})

module.exports = mongoose.model("blog", BlogSchema);
