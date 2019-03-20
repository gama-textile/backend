process.env.NODE_ENV = "test";

const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
const app = require("../app");

chai.use(chaiHttp);

var productinboundId = 0;
var productinbound = {
  color: "pink",
  ingredients: "kain",
  description: "oke kain",
  price: 1000,
  meter: 10,
  capital: 5000,
  dateOfInbound: "",
  productId: 1,
  supplierId: 1
};

var updateproductinbound = {
  color: "merah",
  ingredients: "kain oke"
};

describe("GET all add", () => {
  it("It should get all productinbounds", (done) => {
    chai
      .request(app)
      .get("/api/productinbounds")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.have.property("message");
        expect(res.body.message).to.equal("Success");
        expect(res.body).to.have.property("data");
        done();
      });
  });

  /*
   * POST api/productinbounds
   *
   */
  it("It sould post the productinbounds info", (done) => {
    chai
      .request(app)
      .post("/api/productinbounds")
      .send(productinbound)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res).to.be.json;
        expect(res.body).to.have.property("message");
        expect(res.body.message).to.equal("Success");
        expect(res.body).to.have.property("data");
        productinboundId = res.body.data.id;
        done();
      });
  });

  // Get the inserted postalCode
  it("Get single productinbound", (done) => {
    chai
      .request(app)
      .get(`/api/productinbounds/${productinboundId}`)
      .end((err, res) => {
        expect(res.body.data.color).to.equal(productinbound.color);
        expect(res.body.data.ingredients).to.equal(productinbound.ingredients);
        expect(res.body.data.description).to.equal(productinbound.description);
        expect(res.body.data.price).to.equal(productinbound.price);
        expect(res.body.data.meter).to.equal(productinbound.meter);
        expect(res.body.data.capital).to.equal(productinbound.capital);
        expect(res.body.data.productId).to.equal(productinbound.productId);
        expect(res.body.data.supplierId).to.equal(productinbound.supplierId);
        done();
      });
  });

  // Update the inserted productIbound
  it("Should update the insertedd productIbound", (done) => {
    chai
      .request(app)
      .put(`/api/productinbounds/${productinboundId}`)
      .send(updateproductinbound)
      .end((err, res) => {
        expect(res.body.data.color).to.equal(updateproductinbound.color);
        expect(res.body.data.ingredients).to.equal(
          updateproductinbound.ingredients
        );
        done();
      });
  });

  // Delete
  it("Delete the updated productinbounds", (done) => {
    chai
      .request(app)
      .del(`/api/productinbounds/${productinboundId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.have.property("data");
        expect(res.body).to.have.property("message");
        done();
      });
  });
});
