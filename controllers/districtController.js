const { District, PostalCode } = require("../models");
const Op = require("sequelize").Op;

exports.getAllDistrict = (req, res) => {
  /*
   * GET /api/districts
   * Get all districts
   */

  District.findAll({ include: [{ model: PostalCode }] })
    .then((district) => {
      if (district) {
        res.status(200).json({ data: district, message: "Success" });
      } else {
        res.status(204).json({ message: "No district found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal server error" });
    });
};

exports.createDistrict = (req, res) => {
  /*
   * POST /api/districts
   * Insert district
   */

  const district = ({ name, postalCodeId } = req.body);

  District.create(district)
    .then((disrict) => {
      res.status(201).json({ data: disrict, message: "Success" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal server error" });
    });
};

exports.getSingleDistrict = (req, res) => {
  /*
   * params : id
   * GET /api/districts/1
   * Get single districts by the gived id
   */

  const { id } = req.params;

  District.findOne({ where: { id: { [Op.eq]: id } } })
    .then((disrict) => {
      res.status(200).json({ data: disrict, message: "Success" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal server error" });
    });
};

exports.updatedDistrict = (req, res) => {
  /*
   * params : id
   * PUT /api/districts/1
   * Update disrict with the given id
   */

  const { id } = req.params;
  const newDistrict = ({ name, postalCodeId } = req.body);

  District.findOne({ where: { id: { [Op.eq]: id } } })
    .then((disrict) => {
      if (disrict) {
        return disrict.update(newDistrict).then((updatedDistrict) => {
          res.status(200).json({ data: updatedDistrict, message: "Sucess" });
        });
      } else {
        res.status(400).json({ message: "District not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal server error" });
    });
};

exports.deleteDistrict = (req, res) => {
  /*
   * params : id
   * DELETE /api/districts
   * Delete districts with the gived id
   */
  const { id } = req.params;

  District.findOne({ where: { id: { [Op.eq]: id } } })
    .then((disrict) => {
      return disrict.destroy();
    })
    .then((district) => {
      res.status(200).json({ data: district, message: "Success" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal server error" });
    });
};
