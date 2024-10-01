const LogoutAction = async (req, res) => {
  req.session.destroy();
  res.redirect("/");
};

module.exports = LogoutAction;
