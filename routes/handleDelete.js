const Pages = require("../models/Post");

const handleDelete = (req, res) => {
  if (req.session.isAdmin) {
    Pages.findOneAndDelete({
      _id: req.params.postId,
    })
      .exec()
      .then(() => {
        res.render("adminPortal", {
          heading: "Delete Page",
          subheading: "You have successfully deleted the page!",
        });
      });
  } else res.redirect("/login");
};

module.exports = handleDelete;
