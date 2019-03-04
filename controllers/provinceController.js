const { District, Province } = require("../models");
const Op = require("sequelize").Op;

exports.getAllDProvince = (req, res) => {
  /*
   * GET /api/provinces
   * Get all provinces
   */

  District.findAll({ include: [{ model: District }] })
    .then((province) => {
      if (province) {
        res.status(200).json({ data: provinces, message: "Success" });
      } else {
        res.status(204).json({ message: "No district found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal server error" });
    });
};

exports.createProvince = (req, res) => {
  /*
   * POST /api/provinces
   * Insert provinces
   */

  const province = ({ name, disrictId } = req.body);

  Province.create(province)
    .then((province) => {
      res.status(201).json({ data: province, message: "Success" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal server error" });
    });
};

exports.getSingleProvince = (req, res) => {
  /*
   * params : id
   * GET /api/provinces/1
   * Get single provinces by the gived id
   */

  const { id } = req.params;

  Province.findOne({ where: { id: { [Op.eq]: id } } })
    .then((province) => {
      res.status(200).json({ data: province, message: "Success" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal server error" });
    });
};

exports.updatedProvince = (req, res) => {
  /*
   * params : id
   * PUT /api/provinces/1
   * Update provinces with the given id
   */

  const { id } = req.params;
  const newProvince = ({ name, disrictId } = req.body);

  District.findOne({ where: { id: { [Op.eq]: id } } })
    .then((province) => {
      if (province) {
        return province.update(newProvince).then((updatedProvince) => {
          res.status(200).json({ data: updatedProvince, message: "Sucess" });
        });
      } else {
        res.status(400).json({ message: "District not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal server error" });
    });
};

exports.deleteProvince = (req, res) => {
  /*
   * params : id
   * DELETE /api/provinces
   * Delete provinces with the gived id
   */
  const { id } = req.params;

  province
    .findOne({ where: { id: { [Op.eq]: id } } })
    .then((province) => {
      return province.destroy();
    })
    .then((province) => {
      res.status(200).json({ data: province, message: "Success" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal server error" });
    });
};
