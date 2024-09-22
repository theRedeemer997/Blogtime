const loginCredentials = require("../utils/isAdmin");

const loginAction = (req, res) => {
  if (loginCredentials(req.body.username, req.body.password)) {
    req.session.username = req.body.username;
    req.session.isAdmin = true;
    res.redirect("/admin");
  } else {
    res.render("login", { err: "Invalid username or password" });
  }
};

module.exports = loginAction;
