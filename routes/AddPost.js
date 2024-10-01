require("dotenv").config();
const { initializeApp } = require("firebase/app");
const {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} = require("firebase/storage");
const config = require("../config/firebaseConfig");

const Post = require("../models/Post");

//Initialize a firebase application
const app = initializeApp(config);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

const AddPostPage = async (req, res) => {
  if (
    req.body.pagetitle.length !== 0 &&
    req.file !== null &&
    parseInt(req.body.content) > 0
  ) {
    //get the file name
    let fileName = req.file.originalname;

    //get the image object
    let heroImage = req.file.heroimage;

    /*

    //get the path

    heroImagePath = `public/heroimage/${fileName}`;

    //store the image in the public folder
    heroImage.mv(heroImagePath, (err) => {
      console.log(err);
    });

    */

    const dateTime = giveCurrentDateTime();

    const storageRef = ref(
      storage,
      `files/${req.file.originalname + "       " + dateTime}`
    );
    console.log(
      "🚀 ~ AddPostPage ~ req.file.originalname:",
      req.file.originalname
    );

    // Create file metadata including the content type
    const metadata = {
      contentType: req.file.mimetype,
    };
    console.log("🚀 ~ AddPostPage ~ metadata:", metadata);

    // Upload the file in the bucket storage
    const snapshot = await uploadBytesResumable(
      storageRef,
      req.file.buffer,
      metadata
    );
    //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel

    // Grab the public url
    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log("🚀 ~ AddPostPage ~ downloadURL:", downloadURL);

    console.log("File successfully uploaded.");

    //create the record
    let newPost = {
      pagetitle: req.body.pagetitle.trim(),
      heroImage: req.file.originalname,
      body: req.body.body,
      ImageUrl: downloadURL,
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

const giveCurrentDateTime = () => {
  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date + " " + time;
  return dateTime;
};

module.exports = AddPostPage;
