const Pages = require("../models/Post");

const getTheEditPage = (req, res) => {
  if (req.session.isAdmin) {
    Pages.find({})
      .exec()
      .then((pages) => {
        res.render("editPage", {
          pages,
        });
      });
  } else res.redirect("/login");
};

module.exports = getTheEditPage;
