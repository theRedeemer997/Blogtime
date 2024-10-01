const { mongoose, Schema } = require("mongoose");

const Post = new Schema({
  pagetitle: String,
  heroImage: String,
  body: String,
  ImageUrl: String,
});

module.exports = mongoose.model("Post", Post);
