const { default: mongoose } = require("mongoose");

const Post = mongoose.model("Post", {
  pagetitle: String,
  heroImage: String,
  body: String,
});

module.exports = Post;
