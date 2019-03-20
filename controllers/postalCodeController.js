var { PostalCode } = require("../models");
var Op = require("sequelize").Op;

exports.getAllPostalCode = (req, res) => {
  /*
   * GET /api/postalcodes/
   * Get all postalcodes
   */

  PostalCode.findAll()
    .then((postalcode) => {
      if (postalcode) {
        res.status(200).json({ data: postalcode, message: "Success" });
      } else {
        res.status(204).json({ message: "No postalcode found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal server error" });
    });
};

exports.getSinglePostalCode = (req, res) => {
  /*
   * params : id
   * GET /api/postalcode/1
   * Get single postalcode by the gived id
   */

  const { id } = req.params;

  PostalCode.findOne({ where: { id: { [Op.eq]: id } } })
    .then((postalcode) => {
      res.status(200).json({ data: postalcode, message: "Success" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal server error" });
    });
};

exports.createPostalCode = (req, res) => {
  /*
   * POST /api/postalcode
   * Insert postalcode
   */
  const postalcode = ({ name } = req.body);

  PostalCode.create(postalcode)
    .then((postalcode) => {
      res.status(200).json({ data: postalcode, message: "Success" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal server error" });
    });
};

exports.updatePostalCode = (req, res) => {
  /*
   * params : id
   * PUT /api/postalcode/1
   * Update postalcode with the given id
   */

  const { id } = req.params;
  const newPostalCode = ({ name } = req.body);

  PostalCode.findOne({ where: { id: { [Op.eq]: id } } })
    .then((postalcode) => {
      if (postalcode) {
        return postalcode.update(newPostalCode).then((updatedPostalCode) => {
          res.status(201).json({ data: updatedPostalCode, message: "Success" });
        });
      } else {
        res.status(400).json({ message: "Address not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal server error" });
    });
};

exports.deletePostalCode = (req, res) => {
  /*
   * params : id
   * DELETE /api/postalcode/1
   * Delete postalcode with the gived id
   */

  const { id } = req.params;

  PostalCode.findOne({ where: { id: { [Op.eq]: id } } })
    .then((postalcode) => {
      return postalcode.destroy();
    })
    .then((postalcode) => {
      res.status(200).json({ data: postalcode, message: "Success" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal server error" });
    });
};
