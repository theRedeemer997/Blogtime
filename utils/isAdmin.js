const isAdmin = (username, password) => {
  let adminUserName = "manu";
  let adminPassWord = "mathew";
  if (adminUserName === username && adminPassWord === password) return true;
  else return false;
};

module.exports = isAdmin;
