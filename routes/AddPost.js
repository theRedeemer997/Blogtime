require("dotenv").config();
const Post = require("../models/Post");

const AddPostPage = (req, res) => {
  let heroImagePath;
  if (
    req.body.pagetitle.length !== 0 &&
    req.files !== null &&
    parseInt(req.body.content) > 0
  ) {
    //get the file name
    let fileName = req.files.heroimage.name;

    //get the image object
    let heroImage = req.files.heroimage;

    //get the path
    if (process.env.ENV === "DEV") {
      heroImagePath = `public/heroimage/${fileName}`;
    } else {
      heroImagePath = `/tmp/`;
    }

    //store the image in the public folder
    heroImage.mv(heroImagePath, (err) => {
      console.log(err);
    });

    //create the record
    let newPost = {
      pagetitle: req.body.pagetitle.trim(),
      heroImage: req.files.heroimage.name,
      body: req.body.body,
    };

    const post = new Post(newPost);

    post.save().then((response) => {
      // store the record in the db;
      res.render("adminPortal", {
        heading: "Add new page",
        subheading: "You have successfully created a new page!",
      });
    });
  } else {
    res.render("addPage", {
      err: "Please fill all the details to submit successfully",
    });
  }
};

module.exports = AddPostPage;
