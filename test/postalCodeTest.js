process.env.NODE_ENV = "test";

const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
const app = require("../app");
const { PostalCode } = require("../models");

chai.use(chaiHttp);
var postalCodeId;
var newPostalCode = {
  name: "Jawa tengah"
};

var updatedPostalCode = {
  name: "Jawa barat"
};

describe("Postal Code Crud", function() {
  /* GET all postal code */
  it("It should get all postal code", (done) => {
    chai
      .request(app)
      .get("/api/postalcodes")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.have.property("message");
        expect(res.body.message).to.equal("Success");
        expect(res.body).to.have.property("data");
        done();
      });
  });

  /* Insert bank */
  it("Should create new postal code", (done) => {
    chai
      .request(app)
      .post("/api/postalcodes")
      .send(newPostalCode)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.have.property("message");
        expect(res.body.message).to.equal("Success");
        expect(res.body).to.have.property("data");
        postalCodeId = res.body.data.id;
        newPostalCode.name = res.body.data.name;
        done();
      });
  });

  /* check in the database */
  it("Should create postal code in database", (done) => {
    PostalCode.findOne({
      where: {
        id: postalCodeId
      }
    }).then((postalcodes) => {
      expect(postalcodes.name).to.equal(newPostalCode.name);
      done();
    });
  });

  /* update bank */
  it("should update postal code", (done) => {
    chai
      .request(app)
      .put(`/api/postalcodes/${postalCodeId}`)
      .send(updatedPostalCode)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res).to.be.json;
        expect(res.body).to.have.property("message");
        expect(res.body.message).to.equal("Success");
        expect(res.body).to.have.property("data");
        updatedPostalCode.name = res.body.data.name;
        done();
      });
  });

  /* check in the database */
  it("Should update postal code in database", (done) => {
    PostalCode.findOne({
      where: {
        id: postalCodeId
      }
    }).then((postalcodes) => {
      expect(postalcodes.name).to.equal(updatedPostalCode.name);
      done();
    });
  });

  /* delete postal code */
  it("Should delete a postal code", (done) => {
    chai
      .request(app)
      .del(`/api/postalcodes/${postalCodeId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.have.property("message");
        expect(res.body.message).to.equal("Success");
        expect(res.body).to.have.property("data");
        done();
      });
  });

  /*check in the database */
  it("Should delete postal code in database", (done) => {
    PostalCode.findOne({
      where: {
        id: postalCodeId
      }
    }).then((postalcodes) => {
      expect(postalcodes).to.equal(null);
      done();
    });
  });
});
