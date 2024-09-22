const LogoutAction = (req, res) => {
  req.session.destroy();
  res.redirect("/");
};

module.exports = LogoutAction;
