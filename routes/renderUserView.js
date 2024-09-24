const Posts = require("../models/Post");

const renderUserView = async(req, res) => {
  const pages = await Posts.find();
  res.render("userView", { pages })
};

module.exports = renderUserView;
