process.env.NODE_ENV = "test";

const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
const app = require("../app");
const { Cart } = require("../models");

chai.use(chaiHttp);
var cartId = 0;
var cart = {
  productInboundId: 1,
  customerId: 2,
  note: "Warna Hijau",
  length_per_meter: 6
};

var updatedNote = {
  note: "Updated Note"
};

describe("GET all add", (done) => {
  chai
    .request(app)
    .get("/api/carts")
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.have.property("message");
      expect(res.body.message).to.equal("Success read all carts");
      expect(res.body).to.have.property("data");
    });
});

describe("/carts CRUD", () => {
  // Insert an address
  it("Should insert cart into database", (done) => {
    chai
      .request(app)
      .post("/api/carts")
      .send(cart)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res).to.be.json;
        expect(res.body).to.have.property("message");
        expect(res.body).to.have.property("data");
        cartId = res.body.data.id;
        done();
      });
  });

  // Get the inserted address
  it("GET SINGLE CART", (done) => {
    chai
      .request(app)
      .get(`/api/carts/${cartId}`)
      .end((err, res) => {
        expect(res.body.data.productInboundId).to.equal(cart.productInboundId);
        expect(res.body.data.customerId).to.equal(cart.customerId);
        expect(res.body.data.note).to.equal(cart.note);
        expect(res.body.data.length_per_meter).to.equal(cart.length_per_meter);
        done();
      });
  });

  // Update the inserted address
  it("Should update cart", (done) => {
    chai
      .request(app)
      .put(`/api/carts/${cartId}`)
      .send(updatedNote)
      .end((err, res) => {
        expect(res.body.data.productInboundId).to.equal(cart.productInboundId);
        expect(res.body.data.customerId).to.equal(cart.customerId);
        expect(res.body.data.note).to.equal("Updated Note");
        expect(res.body.data.length_per_meter).to.equal(cart.length_per_meter);
        done();
      });
  });

  // Delete
  it("Delete cart", (done) => {
    chai
      .request(app)
      .del(`/api/carts/${cartId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.have.property("data");
        expect(res.body).to.have.property("message");
        done();
      });
  });
});
