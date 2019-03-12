process.env.NODE_ENV = "test";

const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
const app = require("../app");

chai.use(chaiHttp);

var transaction = {
  dateOfTransaction: "",
  dropShipName: "Elfin",
  customerId: 1,
  shippingAddressId: 1
};

describe("Transaction", () => {
  it("It should get all transaction", (done) => {
    chai
      .request(app)
      .get("/api/transactions")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.have.property("message");
        expect(res.body.message).to.equal("Success");
        expect(res.body).to.have.property("data");
        done();
      });
  });

  // Insert an transaction
  it("Should insert transaction into database", (done) => {
    chai
      .request(app)
      .post("/api/transactions")
      .send(transaction)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res).to.be.json;
        expect(res.body).to.have.property("message");
        expect(res.body.message).to.equal("Success");
        expect(res.body).to.have.property("data");
        done();
      });
  });
});
