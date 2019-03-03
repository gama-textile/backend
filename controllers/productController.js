const { Product } = require("../models");
const Op = require("sequelize").Op;

exports.index = (req, res) => {
  /*
   * GET api/products
   * this function display all banks
   */
  Product.findAll()
    .then((products) => {
      res
        .status(200)
        .json({ data: products, message: "Success read all products" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    });
};

exports.upload = (req, res) => {
  /*
   * POST api/products
   * this function add products and upload file
   */

  // Upload a Multipart-File then saving it to MySQL database
  let sampleFile;
  let uploadPath;

  if (Object.keys(req.files).length == 0) {
    res.status(400).send("No files were uploaded.");
    return;
  }

  console.log("req.files >>>", req.files); // eslint-disable-line

  sampleFile = req.files.imageUrl;

  uploadPath = "public/images/" + sampleFile.name;

  const { name, width } = req.body;

  sampleFile.mv(uploadPath, function(err) {
    if (err) {
      console.log(err);
      console.log("kacuk error");
      return res.status(500).json({ message: "  Internal server error" });
    }
    Product.create({ name, width, imageUrl: uploadPath })
      .then((product) => {
        res.status(200).json({ message: "File uploaded to" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
      });
  });
};

exports.find = (req, res) => {
  /*
   * GET api/products/1
   * this function get a single product
   */
  const productId = req.params.id;

  Product.findOne({ where: { id: { [Op.eq]: productId } } })
    .then((product) => {
      res
        .status(200)
        .json({ data: product, message: "Success getting product" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    });
};

exports.update = (req, res) => {
  /*
   * PUT api/products/2
   * Update single product
   */
  const productId = req.params.id;
  const { name, width, imageUrl } = req.body;

  Product.findOne({ where: { id: { [Op.eq]: productId } } })
    .then((product) => {
      if (product) {
        return product.update({ name, width, imageUrl }).then((product) => {
          res
            .status(201)
            .json({ data: product, message: "Success update product" });
        });
      } else {
        res.status(400).json({ message: "Product not found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    });
};

exports.destroy = (req, res) => {
  /*
   * DELETE api/banks/2
   * Delete a bank with the given id
   */

  const productId = req.params.id;

  Product.findOne({ where: { id: { [Op.eq]: productId } } })
    .then((product) => {
      return product.destroy();
    })
    .then((product) => {
      res
        .status(200)
        .json({ data: product, message: "Success delete product" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    });
};

// const fs = require('fs');

// const db = require('../config/db.config.js');
// const Image = db.images;

// // Upload a Multipart-File then saving it to MySQL database
// exports.upload = (req, res) => {
// 	Image.create({
// 		type: req.file.mimetype,
// 		name: req.file.originalname,
// 		data: fs.readFileSync(__basedir + '/resources/static/assets/uploads/' + req.file.filename)
// 	}).then(image => {
// 		try{
// 			fs.writeFileSync(__basedir + '/resources/static/assets/tmp/' + image.name, image.data);

// 			// exit node.js app
// 			res.json({'msg': 'File uploaded successfully!', 'file': req.file});
// 		}catch(e){
// 			console.log(e);
// 			res.json({'err': e});
// 		}
// 	})
// };
