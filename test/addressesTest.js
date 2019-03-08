process.env.NODE_ENV = "test";

const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
const app = require("../app");

chai.use(chaiHttp);

var customerId;
var address = {
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
var updatedAddress = {
  name: "Alamat Rumah Ku"
};
describe("Addressres Crud", (done) => {
  /*
   * GET api/addresses
   *
   */
  it("It should get all addresses", (done) => {
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

  // Insert an address
  it("Should insert address into database", (done) => {
    chai
      .request(app)
      .post("/api/addresses")
      .send(address)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.have.property("message");
        expect(res.body).to.have.property("data");
        customerId = res.body.data.customerId;
        done();
      });
  });

  // Get the inserted address
  it("GET SINGLE ADDRESS", (done) => {
    chai
      .request(app)
      .get(`/api/addresses/${addressId}`)
      .end((err, res) => {
        expect(res.body.data.name).to.equal(address.name);
        expect(res.body.data.phoneNumber).to.equal(address.phoneNumber);
        expect(res.body.data.description).to.equal(address.description);
        expect(res.body.data.storeAddress).to.equal(address.storeAddress);
        expect(res.body.data.mainAddress).to.equal(address.mainAddress);
        expect(res.body.data.latitude).to.equal(address.latitude);
        expect(res.body.data.longitude).to.equal(address.longitude);
        expect(res.body.data.customerId).to.equal(address.customerId);
        expect(res.body.data.cityId).to.equal(address.cityId);
        expect(res.body.data.provinceId).to.equal(address.provinceId);
        expect(res.body.data.districtId).to.equal(address.districtId);
        expect(res.body.data.postalCodeId).to.equal(address.postalCodeId);
        done();
      });
  });

  // Update the inserted address
  it("Should update the insertedd address", (done) => {
    chai
      .request(app)
      .put(`/api/addresses/${addressId}`)
      .send(updatedAddress)
      .end((err, res) => {
        expect(res.body.data.name).to.equal("Alamat Rumah Ku");
        expect(res.body.data.phoneNumber).to.equal(address.phoneNumber);
        expect(res.body.data.description).to.equal(address.description);
        expect(res.body.data.storeAddress).to.equal(address.storeAddress);
        expect(res.body.data.mainAddress).to.equal(address.mainAddress);
        expect(res.body.data.latitude).to.equal(address.latitude);
        expect(res.body.data.longitude).to.equal(address.longitude);
        expect(res.body.data.customerId).to.equal(address.customerId);
        expect(res.body.data.cityId).to.equal(address.cityId);
        expect(res.body.data.provinceId).to.equal(address.provinceId);
        expect(res.body.data.districtId).to.equal(address.districtId);
        expect(res.body.data.postalCodeId).to.equal(address.postalCodeId);
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
        done();
      });
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
