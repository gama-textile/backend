process.env.NODE_ENV = "test";

const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
const app = require("../app");
const { Product } = require("../models");

chai.use(chaiHttp);

describe("/GET product", () => {
  /*
   * GET api/products
   *
   */
  it("It should get all product", (done) => {
    chai
      .request(app)
      .get("/api/products")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.have.property("message");
        expect(res.body.message).to.equal("Success read all products");
        expect(res.body).to.have.property("data");
        done();
      });
  });
});

var productId = "";
var name = "kain1";
var width = 10;
describe("/POST product", () => {
  /*
   * POST api/products
   *
   */
  it("It sould post the product info", (done) => {
    chai
      .request(app)
      .post("/api/products")
      .send({ name, width })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res).to.be.json;
        expect(res.body).to.have.property("message");
        expect(res.body.message).to.equal("Success create data product");
        expect(res.body).to.have.property("data");
        productId = res.body.data.id;
        name = res.body.data.name;
        console.log(name);
        width = res.body.data.width;
        done();
      });
  });

  /*
   * POST api/products
   * cek didalam database
   */

  it("Should create product in database", (done) => {
    console.log(productId);
    Product.findOne({
      where: {
        id: productId
      }
    }).then((product) => {
      expect(product.name).to.equal(name);
      expect(product.width).to.equal(width);
      done();
    });
  });
});

describe("/PUT/:id product", () => {
  /*
   * PUT api/products/2
   *
   */
  it("should update product info", (done) => {
    chai
      .request(app)
      .put(`/api/products/${productId}`)
      .send({ name: "kain ubah", width: 11 })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res).to.be.json;
        expect(res.body).to.have.property("message");
        expect(res.body.message).to.equal("Success update product");
        expect(res.body).to.have.property("data");
        name = res.body.data.name;
        width = res.body.data.width;
        done();
      });
  });
  /*
   * PUT api/banks/2
   * cek didalam database
   */
  it("Should update product in database", (done) => {
    Product.findOne({
      where: {
        id: productId
      }
    }).then((product) => {
      expect(product.name).to.equal(name);
      expect(product.width).to.equal(width);
      done();
    });
  });
});

describe("/DELETE/:id product", () => {
  /*
   * DELETE api/product/2
   *
   */
  it("Should delete a product", (done) => {
    chai
      .request(app)
      .del(`/api/products/${productId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.have.property("message");
        expect(res.body.message).to.equal("Success delete product");
        expect(res.body).to.have.property("data");
        done();
      });
  });
  /*
   * DELETE api/banks
   * cek didalam database
   */
  it("Should delete product in database", (done) => {
    Product.findOne({
      where: {
        id: productId
      }
    }).then((product) => {
      expect(product).to.equal(null);
      done();
    });
  });
});
