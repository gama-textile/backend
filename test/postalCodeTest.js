process.env.NODE_ENV = "test";

const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
const app = require("../app");
const { PostalCOde } = require("../models");

chai.use(chaiHttp);

describe("GET all add", (done) => {
  chai
    .request(app)
    .get("/api/postalcodes")
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.have.property("message");
      expect(res.body.message).to.equal("Success");
      expect(res.body).to.have.property("data");
    });
});

var postalCodeId = 0;
var postalCode = {
  name: "Jawa tengan"
};

var updatedpostalcode = {
  name: "Jawa Baru"
};

describe("/PostalCode CRUD", () => {
  // Insert an postalCode
  it("Should insert postalCode into database", (done) => {
    chai
      .request(app)
      .post("/api/postalcodes")
      .send(postalCode)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.have.property("message");
        expect(res.body).to.have.property("data");
        postalCodeId = res.body.data.id;
        done();
      });
  });

  // Get the inserted postalCode
  it("GET SINGLE postalCode", (done) => {
    chai
      .request(app)
      .get(`/api/postalcodes/${postalCodeId}`)
      .end((err, res) => {
        expect(res.body.data.name).to.equal(postalCode.name);
        done();
      });
  });

  // Update the inserted postalCode
  it("Should update the insertedd postalCode", (done) => {
    chai
      .request(app)
      .put(`/api/postalcodes/${postalCodeId}`)
      .send(updatedpostalcode)
      .end((err, res) => {
        console.log(res.body.data.name);
        expect(res.body.data.name).to.equal(updatedpostalcode.name);
        done();
      });
  });

  // Delete
  it("Delete the updated postalCode", (done) => {
    chai
      .request(app)
      .del(`/api/postalcodes/${postalCodeId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.have.property("data");
        expect(res.body).to.have.property("message");
        done();
      });
  });
});
