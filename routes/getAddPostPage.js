const getAddPostPage = (req, res) => {
  if (req.session.isAdmin) {
    res.render("addPage");
  } else res.redirect("/login");
};

module.exports = getAddPostPage;
