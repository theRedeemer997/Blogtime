require('dotenv').config();
const express = require("express");
const blogTimeApp = express();
const path = require("node:path");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const session = require("express-session");

//get check from the express validator
const { check } = require("express-validator");

//get the Login Page
const getLoginPage = require("./routes/getLoginPage");

//get the edit Page
const getTheEditPage = require("./routes/getTheEditPage");

//get the Add Post Page
const getAddPostPage = require("./routes/getAddPostPage");

//post route for add page
const postThePost = require("./routes/AddPost");

//get route to get all posts
const handleEdit = require("./routes/handleEdit");

//edit post route
const renderEdit = require("./routes/renderEditPage");

//delete post route
const handleDelete = require("./routes/handleDelete");

const renderAsUser = require("./routes/renderUserView");

const loginAction = require("./routes/loginAction");

const logoutAction = require("./routes/logoutAction");

const getAdminPortal = require("./routes/renderAdminPortal");

//url encoded
blogTimeApp.use(express.urlencoded({ extended: false }));

//set the public folder
blogTimeApp.use(express.static(path.join(__dirname + "/public")));

//set the session
blogTimeApp.use(
  session({
    secret: "iamakoolguy",
    resave: false,
    saveUninitialized: true,
  })
);

blogTimeApp.use(fileUpload());

//set the views folder
blogTimeApp.set("views", __dirname + "/views");

// set the ejs engine 
blogTimeApp.set("view engine", "ejs");

//set the port
const PORT = process.env.PORT;

//render the userview
blogTimeApp.get("/", renderAsUser);

//get the login form
blogTimeApp.get("/login", getLoginPage);

// get the add post page
blogTimeApp.get("/addPost", getAddPostPage);

//push the post to db
blogTimeApp.post("/addPost", postThePost);

//get the edit page --> page with all the post
blogTimeApp.get("/editPages", getTheEditPage);

//render the edit page
//blogTimeApp.get("/edit/:postId", renderEdit);
blogTimeApp.get("/edit/:postId", renderEdit);

//perform the edit operation
blogTimeApp.post("/edit/:postId", handleEdit);

//perform the delete operation
blogTimeApp.get("/delete/:postId", handleDelete);

//perform the login admin
blogTimeApp.post("/login", loginAction);

//perform the logout action
blogTimeApp.get("/logout", logoutAction);

//get the adminPortal
blogTimeApp.get("/admin", getAdminPortal);

//connect to DB
//mongoose.connect("mongodb://localhost:27017/blogtime");
const db = require('./connectDB');
db();

blogTimeApp.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});
