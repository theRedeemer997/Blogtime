const { mongoose, Schema } = require("mongoose");

const Post = new Schema({
    pagetitle: String,
    heroImage: String,
    body: String,
});

module.exports = mongoose.model("Post", Post);
