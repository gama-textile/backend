const express = require("express");
const router = express.Router();
// const {
//   index,
//   create,
//   find,
//   update,
//   destroy
// } = require("../controllers/productController");

// router.get("/", index);
// router.post("/", create);
// router.get("/:id", find);
// router.put("/:id", update);
// router.delete("/:id", destroy);
router.post("/", (req, res) => {
  if (Object.keys(req.files).length == 0) {
    return res.status(400).send("No files were uploaded.");
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.imageUrl;

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv("/home/Elfin/filename.jpg", function(err) {
    if (err) return res.status(500).send(err);

    res.send("File uploaded!");
  });
});

module.exports = router;
