const Pages = require("../models/Post");

const handleEdit = (req, res) => {
  if (
    req.body.pagetitle.length !== 0 &&
    req.body.uploadedImage.length !== 0 &&
    parseInt(req.body.content) > 0
  ) {
    //get the file name
    let fileName =
      req.files === null ? req.body.uploadedImage : req.files.heroimage.name;

    if (req.files !== null) {
      //get the image object
      let heroImage = req.files.heroimage;

      //get the path
      let heroImagePath = `public/heroimage/${fileName}`;

      //store the image in the public folder
      heroImage.mv(heroImagePath, (err) => {
        console.log(err);
      });
    }

    Pages.findOneAndUpdate(
      {
        _id: req.params.postId,
      },
      {
        pagetitle: req.body.pagetitle,
        heroImage:
          req.files === null
            ? req.body.uploadedImage
            : req.files.heroimage.name,
        body: req.body.body,
      }
    )
      .exec()
      .then(() => {
        res.render("adminPortal", {
          heading: "Edit Page",
          subheading: "You have successfully edited the page!",
        });
      });
  } else {
    res.render("edit", {
      err: "Please fill all the details to submit successfully",
    });
  }
};  

module.exports = handleEdit;
