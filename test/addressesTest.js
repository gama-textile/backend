process.env.NODE_ENV = "test";
const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
const app = require("../app");
const { Address } = require("../models");

chai.use(chaiHttp);

var customerId;
var addressId;
/* variabel new address */
var newAddress = {
  name: "Alamat Rumah",
  phoneNumber: "08987876",
  description: "Deskripsi untuk alamat rumah",
  storeAddress: true,
  mainAddress: true,
  latitude: 432423.432,
  longitude: 424324.432,
  customerId: 1,
  cityId: 1,
  provinceId: 1,
  districtId: 1,
  postalCodeId: 1
};

/* variabel update address */
var updateAddress = {
  name: "Alamat Rumah ubah",
  phoneNumber: "08987876",
  description: "Deskripsi untuk alamat rumah",
  storeAddress: true,
  mainAddress: true,
  latitude: 432423.432,
  longitude: 424324.432,
  customerId: 1,
  cityId: 1,
  provinceId: 1,
  districtId: 1,
  postalCodeId: 1
};

describe("Address Crud", function() {
  /*  get all address */
  it("It should get all address", (done) => {
    chai
      .request(app)
      .get("/api/addresses")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.have.property("message");
        expect(res.body.message).to.equal("Success");
        expect(res.body).to.have.property("data");
        done();
      });
  });

  /* insert address single customer */
  it("It Should create new address single customer", (done) => {
    chai
      .request(app)
      .post("/api/addresses")
      .send(newAddress)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res).to.be.json;
        expect(res.body).to.have.property("message");
        expect(res.body.message).to.equal("Success");
        expect(res.body).to.have.property("data");
        addressId = res.body.data.id;
        customerId = res.body.data.customerId;
        newAddress.name = res.body.data.name;
        newAddress.phoneNumber = res.body.data.phoneNumber;
        newAddress.description = res.body.data.description;
        newAddress.storeAddress = res.body.data.storeAddress;
        newAddress.mainAddress = res.body.data.mainAddress;
        newAddress.latitude = res.body.data.latitude;
        newAddress.longitude = res.body.data.longitude;
        newAddress.customerId = res.body.data.customerId;
        newAddress.cityId = res.body.data.cityId;
        newAddress.provinceId = res.body.data.provinceId;
        newAddress.districtId = res.body.data.districtId;
        newAddress.postalCodeId = res.body.data.postalCodeId;
        done();
      });
  });

  /* check in the database */
  it("Should create adress in database", (done) => {
    Address.findOne({
      where: {
        id: addressId
      }
    })
      .then((address) => {
        expect(address.name).to.equal(newAddress.name);
        expect(address.phoneNumber).to.equal(newAddress.phoneNumber);
        expect(address.description).to.equal(newAddress.description);
        expect(address.storeAddress).to.equal(newAddress.storeAddress);
        expect(address.mainAddress).to.equal(newAddress.mainAddress);
        expect(address.latitude).to.equal(newAddress.latitude);
        expect(address.longitude).to.equal(newAddress.longitude);
        expect(address.customerId).to.equal(newAddress.customerId);
        expect(address.cityId).to.equal(newAddress.cityId);
        expect(address.provinceId).to.equal(newAddress.provinceId);
        expect(address.districtId).to.equal(newAddress.districtId);
        expect(address.postalCodeId).to.equal(newAddress.postalCodeId);
      })
      .finally(done);
  });

  /*  get all address single customer */
  it("It should get all address single customer", (done) => {
    chai
      .request(app)
      .get(`/api/addresses/${customerId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.have.property("message");
        expect(res.body.message).to.equal("Success");
        expect(res.body).to.have.property("data");
        done();
      });
  });

  /* update bank */
  it("should update address single customer", (done) => {
    chai
      .request(app)
      .put(`/api/addresses/${customerId}`)
      .send(updateAddress)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.have.property("message");
        expect(res.body.message).to.equal("Success");
        expect(res.body).to.have.property("data");
        updateAddress.name = res.body.data.name;
        updateAddress.phoneNumber = res.body.data.phoneNumber;
        updateAddress.description = res.body.data.description;
        updateAddress.storeAddress = res.body.data.storeAddress;
        updateAddress.mainAddress = res.body.data.mainAddress;
        updateAddress.latitude = res.body.data.latitude;
        updateAddress.longitude = res.body.data.longitude;
        updateAddress.customerId = res.body.data.customerId;
        updateAddress.cityId = res.body.data.cityId;
        updateAddress.provinceId = res.body.data.provinceId;
        updateAddress.districtId = res.body.data.districtId;
        updateAddress.postalCodeId = res.body.data.postalCodeId;
        done();
      });
  });

  /* check in the database */
  it("Should update address in database", (done) => {
    Address.findOne({
      where: {
        customerId: customerId
      }
    }).then((address) => {
      expect(address.name).to.equal(updateAddress.name);
      expect(address.phoneNumber).to.equal(updateAddress.phoneNumber);
      expect(address.description).to.equal(updateAddress.description);
      expect(address.storeAddress).to.equal(updateAddress.storeAddress);
      expect(address.mainAddress).to.equal(updateAddress.mainAddress);
      expect(address.latitude).to.equal(updateAddress.latitude);
      expect(address.longitude).to.equal(updateAddress.longitude);
      expect(address.customerId).to.equal(updateAddress.customerId);
      expect(address.cityId).to.equal(updateAddress.cityId);
      expect(address.provinceId).to.equal(updateAddress.provinceId);
      expect(address.districtId).to.equal(updateAddress.districtId);
      expect(address.postalCodeId).to.equal(updateAddress.postalCodeId);
      done();
    });
  });

  // Delete
  it("Delete the updated address", (done) => {
    chai
      .request(app)
      .del(`/api/addresses/${addressId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.have.property("data");
        expect(res.body).to.have.property("message");
        expect(res.body.message).to.equal("Success");
        done();
      });
  });

  /*check in the database */
  it("Should delete address in database", (done) => {
    Address.findOne({
      where: {
        id: addressId
      }
    })
      .then((address) => {
        expect(address).to.equal(null);
      })
      .finally(done);
  });
});

// var addressId = 0;
// var address = {
//   name: "Alamat Rumah",
//   phoneNumber: "08987876",
//   description: "Deskripsi untuk alamat rumah",
//   storeAddress: true,
//   mainAddress: true,
//   latitude: 432423.432,
//   longitude: 424324.432,
//   customerId: 1,
//   cityId: 1,
//   provinceId: 1,
//   districtId: 1,
//   postalCodeId: 1
// };

// var updatedAddress = {
//   name: "Alamat Rumah Ku"
// };

// describe("/Address CRUD", () => {
//   // Insert an address
//   it("Should insert address into database", (done) => {
//     chai
//       .request(app)
//       .post("/api/addresses")
//       .send(address)
//       .end((err, res) => {
//         expect(res).to.have.status(200);
//         expect(res).to.be.json;
//         expect(res.body).to.have.property("message");
//         expect(res.body).to.have.property("data");
//         addressId = res.body.data.id;
//         done();
//       });
//   });

// // Get the inserted address
// it("GET SINGLE ADDRESS", (done) => {
//   chai
//     .request(app)
//     .get(`/api/addresses/${addressId}`)
//     .end((err, res) => {
//       expect(res.body.data.name).to.equal(address.name);
//       expect(res.body.data.phoneNumber).to.equal(address.phoneNumber);
//       expect(res.body.data.description).to.equal(address.description);
//       expect(res.body.data.storeAddress).to.equal(address.storeAddress);
//       expect(res.body.data.mainAddress).to.equal(address.mainAddress);
//       expect(res.body.data.latitude).to.equal(address.latitude);
//       expect(res.body.data.longitude).to.equal(address.longitude);
//       expect(res.body.data.customerId).to.equal(address.customerId);
//       expect(res.body.data.cityId).to.equal(address.cityId);
//       expect(res.body.data.provinceId).to.equal(address.provinceId);
//       expect(res.body.data.districtId).to.equal(address.districtId);
//       expect(res.body.data.postalCodeId).to.equal(address.postalCodeId);
//       done();
//     });
// });

// // Update the inserted address
// it("Should update the insertedd address", (done) => {
//   chai
//     .request(app)
//     .put(`/api/addresses/${addressId}`)
//     .send(updatedAddress)
//     .end((err, res) => {
//       expect(res.body.data.name).to.equal("Alamat Rumah Ku");
//       expect(res.body.data.phoneNumber).to.equal(address.phoneNumber);
//       expect(res.body.data.description).to.equal(address.description);
//       expect(res.body.data.storeAddress).to.equal(address.storeAddress);
//       expect(res.body.data.mainAddress).to.equal(address.mainAddress);
//       expect(res.body.data.latitude).to.equal(address.latitude);
//       expect(res.body.data.longitude).to.equal(address.longitude);
//       expect(res.body.data.customerId).to.equal(address.customerId);
//       expect(res.body.data.cityId).to.equal(address.cityId);
//       expect(res.body.data.provinceId).to.equal(address.provinceId);
//       expect(res.body.data.districtId).to.equal(address.districtId);
//       expect(res.body.data.postalCodeId).to.equal(address.postalCodeId);
//       done();
//     });
// });

//   // Delete
//   it("Delete the updated address", (done) => {
//     chai
//       .request(app)
//       .del(`/api/addresses/${addressId}`)
//       .end((err, res) => {
//         expect(res).to.have.status(200);
//         expect(res).to.be.json;
//         expect(res.body).to.have.property("data");
//         expect(res.body).to.have.property("message");
//         done();
//       });
//   });
// });
