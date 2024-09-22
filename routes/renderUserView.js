const Posts = require("../models/Post");

const renderUserView = (req, res) => {
  Posts.find({})
    .exec()
    .then((pages) => {
      res.render("userView", { pages });
    });
};

module.exports = renderUserView;
