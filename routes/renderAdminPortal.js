const renderAdminPortal = (req, res) => {
  if (req.session.isAdmin) {
    res.render("adminPortal", {
      heading: "Welcome",
      subheading: "Hello Admin, Welcome to the dashboard",
    });
  } else res.redirect("/login");
};

module.exports = renderAdminPortal;
