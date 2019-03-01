const express = require("express");
const router = express.Router();
const multer = require("multer");
const { Product } = require("../models");
const Op = require("sequelize").Op;
const {
  index,
  upload,
  find,
  update,
  destroy
} = require("../controllers/productController");

router.get("/", index);
router.post("/", upload);
router.get("/:id", find);
router.put("/:id", update);
router.delete("/:id", destroy);

module.exports = router;

// module.exports = function(app) {
//   const multer = require("multer");

//   var storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, __basedir + "/uploads/");
//     },
//     filename: (req, file, cb) => {
//       cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
//     }
//   });

//   var upload = multer({ storage: storage });

//   app.post("/api/uploadfile", upload.single("uploadfile"), (req, res) => {
//     console.log(req.file);
//     res.json({ msg: "File uploaded successfully!", file: req.file });
//   });
// };

// const express = require("express");
// const { Product } = require("../models");
// const router = express.Router();
// const {
//   index,
//   create,
//   find,
//   update,
//   destroy
// } = require("../controllers/productController");

// router.get("/", index);
// // router.post("/", create);
// router.get("/:id", find);
// router.put("/:id", update);
// router.delete("/:id", destroy);

// router.post("/", function(req, res) {
//   if (Object.keys(req.files).length == 0) {
//     return res.status(400).json({ message: "No files were uploaded." });
//   }
//   // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
//   let sampleFile = req.files.imageUrl;
//   const { name, width } = req.body;

//   // fs.readFileSync(__dirname + "/moviedata.json", "utf8");
//   // Use the mv() method to place the file somewhere on your server
//   sampleFile.mv(
//     "/Home/Elfin/portofolio/gama/GT-JS/public/images/" + sampleFile,
//     function(err) {
//       // if (err) {
//       //   console.log(err);
//       //   return res.status(500).json({ message: "err" });
//       // }
//       Product.create({ name, width, imageUrl: sampleFile })
//         .then((product) => {
//           res.status(200).json({ message: "File uploaded!" });
//         })
//         .catch((err) => {
//           console.log(err);
//           res.status(200).json({ message: "File uploaded!" });
//         });
//     }
//   );
// });
// module.exports = router;
