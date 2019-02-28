var { Address } = require("../models");
var Op = require("sequelize").Op;

exports.getAllAddress = (req, res) => {
  /*
   * GET /api/addresses/
   * Get all address
   */

  Address.findAll()
    .then((addressess) => {
      if (addressess) {
        res.status(200).json({ data: addressess, message: "Success" });
      } else {
        res.status(204).json({ message: "No addressess found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal server error" });
    });
};

exports.getSingleAddress = (req, res) => {
  /*
   * params : id
   * GET /api/addresses/1
   * Get single address by the gived id
   */

  const { id } = req.params;

  Address.findOne({ where: { id: { [Op.eq]: id } } })
    .then((address) => {
      res.status(200).json({ data: address, message: "Success" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal server error" });
    });
};

exports.createAddress = (req, res) => {
  /*
   * POST /api/addresses
   * Insert address
   */
  const address = ({
    name,
    phoneNumber,
    description,
    storeAddress,
    mainAddress,
    latitude,
    longitude,
    customerId,
    cityId,
    provinceId,
    districtId,
    postalCodeId
  } = req.body);

  Address.create(address)
    .then((address) => {
      res.status(200).json({ data: address, message: "Successs" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal server error" });
    });
};

exports.updateAddress = (req, res) => {
  /*
   * params : id
   * PUT /api/addresses/1
   * Update address with the given id
   */

  const { id } = req.params;
  const newAddress = ({
    name,
    phoneNumber,
    description,
    storeAddress,
    mainAddress,
    latitude,
    longitude,
    customerId,
    cityId,
    provinceId,
    districtId,
    postalCodeId
  } = req.body);

  Address.findOne({ where: { id: { [Op.eq]: id } } })
    .then((address) => {
      if (address) {
        return address.update(newAddress).then((updatedAddress) => {
          res.status(200).json({ data: updatedAddress, message: "Sucess" });
        });
      } else {
        res.status(400).json({ message: "Address not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal server error" });
    });
};

exports.deleteAddress = (req, res) => {
  /*
   * params : id
   * DELETE /api/addresses/1
   * Delete address with the gived id
   */

  const { id } = req.params;

  Address.findOne({ where: { id: { [Op.eq]: id } } })
    .then((address) => {
      return address.destroy();
    })
    .then((address) => {
      res.status(200).json({ data: address, message: "Sucess" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal server error" });
    });
};
