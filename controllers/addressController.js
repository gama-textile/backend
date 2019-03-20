var {
  Address,
  Customer,
  City,
  Province,
  District,
  PostalCode
} = require("../models");
var Op = require("sequelize").Op;

/* part backoffice */
exports.getAllAddress = (req, res) => {
  /*
   * GET /api/addresses/
   * Get all address
   */

  Address.findAll({
    include: [
      { model: Customer },
      { model: Province },
      { model: City },
      { model: District },
      { model: PostalCode }
    ]
  })
    .then((addresses) => {
      res.status(200).json({ data: addresses, message: "Success" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal server error" });
    });
};

exports.getAllAddreesSingleCustomer = (req, res) => {
  /*
   * params : customerId
   * GET /api/addresses/1
   * Get all address by the gived customerId
   */

  const { customerId } = req.params;

  Address.findAll({
    include: [
      { model: Customer },
      { model: Province },
      { model: City },
      { model: District },
      { model: PostalCode }
    ],
    where: { customerId: { [Op.eq]: customerId } }
  })
    .then((address) => {
      if (address) {
        return res.status(200).json({ data: address, message: "Success" });
      }
    })
    .catch((err) => {
      console.log("error");
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
      res.status(201).json({ data: address, message: "Success" });
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

  const { customerId } = req.params;

  const newAddress = ({
    name,
    phoneNumber,
    description,
    storeAddress,
    mainAddress,
    latitude,
    longitude,
    // customerId,
    cityId,
    provinceId,
    districtId,
    postalCodeId
  } = req.body);

  Address.findOne({ where: { customerId: { [Op.eq]: customerId } } })
    .then((address) => {
      console.log(address);
      if (address) {
        return address.update(newAddress).then((updatedAddress) => {
          res.status(200).json({ data: updatedAddress, message: "Success" });
        });
      } else {
        res.status(404).json({ message: "Address not found" });
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
      res.status(200).json({ data: address, message: "Success" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal server error" });
    });
};
