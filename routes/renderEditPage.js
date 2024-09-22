const Post = require("../models/Post");

const renderEdit = (req, res) => {
  // get the data for the current record.
  Post.findOne({
    _id: req.params.postId,
  })
    .exec()
    .then((post) => {
      res.render("edit", { post });
    });
};

module.exports = renderEdit;
