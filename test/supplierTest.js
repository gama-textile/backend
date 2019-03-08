process.env.NODE_ENV = "test";

const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
const app = require("../app");
const { Supplier } = require("../models");

chai.use(chaiHttp);

var supplierId = "";
var name = "elfin";
var alamat = "lampung";
describe("Suppliers Crud", () => {
  /*
   * GET api/suppliers
   *
   */
  it("It should get all suppliers", (done) => {
    chai
      .request(app)
      .get("/api/suppliers")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.have.property("message");
        expect(res.body.message).to.equal("Success read all suppliers");
        expect(res.body).to.have.property("data");
        done();
      });
  });

  /*
   * POST api/suppliers
   *
   */
  it("It sould post the supplier info", (done) => {
    chai
      .request(app)
      .post("/api/suppliers")
      .send({ name, alamat })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res).to.be.json;
        expect(res.body).to.have.property("message");
        expect(res.body.message).to.equal("Success create supplier");
        expect(res.body).to.have.property("data");
        supplierId = res.body.data.id;
        name = res.body.data.name;
        alamat = res.body.data.alamat;
        done();
      });
  });

  /*
   * POST api/suppliers
   * cek didalam database
   */
  it("Should create supplier in database", (done) => {
    Supplier.findOne({
      where: {
        id: supplierId
      }
    }).then((supplier) => {
      expect(supplier.name).to.equal(name);
      expect(supplier.alamat).to.equal(alamat);
      done();
    });
  });

  /*
   * PUT api/suppliers/2
   *
   */
  it("should update supplier info", (done) => {
    chai
      .request(app)
      .put(`/api/suppliers/${supplierId}`)
      .send({ name: "Iwann", alamat: "jawa" })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res).to.be.json;
        expect(res.body).to.have.property("message");
        expect(res.body.message).to.equal("Success update supplier");
        expect(res.body).to.have.property("data");
        name = res.body.data.name;
        alamat = res.body.data.alamat;
        done();
      });
  });

  /*
   * PUT api/suppliers/2
   * cek didalam database
   */
  it("Should update supplier in database", (done) => {
    Supplier.findOne({
      where: {
        id: supplierId
      }
    }).then((supplier) => {
      expect(supplier.name).to.equal(name);
      expect(supplier.alamat).to.equal(alamat);
      done();
    });
  });

  /*
   * DELETE api/suppliers/2
   *
   */
  it("Should delete a supplier", (done) => {
    chai
      .request(app)
      .del(`/api/suppliers/${supplierId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.have.property("message");
        expect(res.body.message).to.equal("Success delete supplier");
        expect(res.body).to.have.property("data");
        done();
      });
  });

  /*
   * DELETE api/suppliers
   * cek didalam database
   */
  it("Should delete supplier in database", (done) => {
    Supplier.findOne({
      where: {
        id: supplierId
      }
    }).then((supplier) => {
      expect(supplier).to.equal(null);
      done();
    });
  });
});

// var supplierId = "";
// var name = "elfin";
// var alamat = "lampung";
// describe("/POST supplier", () => {
//   /*
//    * POST api/suppliers
//    *
//    */
//   it("It sould post the supplier info", (done) => {
//     chai
//       .request(app)
//       .post("/api/suppliers")
//       .send({ name, alamat })
//       .end((err, res) => {
//         expect(res).to.have.status(201);
//         expect(res).to.be.json;
//         expect(res.body).to.have.property("message");
//         expect(res.body.message).to.equal("Success create supplier");
//         expect(res.body).to.have.property("data");
//         supplierId = res.body.data.id;
//         name = res.body.data.name;
//         alamat = res.body.data.alamat;
//         done();
//       });
//   });

//   /*
//    * POST api/suppliers
//    * cek didalam database
//    */
//   it("Should create supplier in database", (done) => {
//     Supplier.findOne({
//       where: {
//         id: supplierId
//       }
//     }).then((supplier) => {
//       expect(supplier.name).to.equal(name);
//       expect(supplier.alamat).to.equal(alamat);
//       done();
//     });
//   });

//   /*
//    * PUT api/suppliers/2
//    *
//    */
//   it("should update supplier info", (done) => {
//     chai
//       .request(app)
//       .put(`/api/suppliers/${supplierId}`)
//       .send({ name: "Iwann", alamat: "jawa" })
//       .end((err, res) => {
//         expect(res).to.have.status(201);
//         expect(res).to.be.json;
//         expect(res.body).to.have.property("message");
//         expect(res.body.message).to.equal("Success update supplier");
//         expect(res.body).to.have.property("data");
//         name = res.body.data.name;
//         alamat = res.body.data.alamat;
//         done();
//       });
//   });

//   /*
//    * PUT api/suppliers/2
//    * cek didalam database
//    */
//   it("Should update supplier in database", (done) => {
//     Supplier.findOne({
//       where: {
//         id: supplierId
//       }
//     }).then((supplier) => {
//       expect(supplier.name).to.equal(name);
//       expect(supplier.alamat).to.equal(alamat);
//       done();
//     });
//   });

//   /*
//    * DELETE api/suppliers/2
//    *
//    */
//   it("Should delete a supplier", (done) => {
//     chai
//       .request(app)
//       .del(`/api/suppliers/${supplierId}`)
//       .end((err, res) => {
//         expect(res).to.have.status(200);
//         expect(res).to.be.json;
//         expect(res.body).to.have.property("message");
//         expect(res.body.message).to.equal("Success delete supplier");
//         expect(res.body).to.have.property("data");
//         done();
//       });
//   });

//   /*
//    * DELETE api/suppliers
//    * cek didalam database
//    */
//   it("Should delete supplier in database", (done) => {
//     Supplier.findOne({
//       where: {
//         id: supplierId
//       }
//     }).then((supplier) => {
//       expect(supplier).to.equal(null);
//       done();
// ibe("/POST supplier", () => {
//   /*
//    * POST api/suppliers
//    *
//    */
//   it("It sould post the supplier info", (done) => {
//     chai
//       .request(app)
//       .post("/api/suppliers")
//       .send({ name, alamat })
//       .end((err, res) => {
//         expect(res).to.have.status(201);
//         expect(res).to.be.json;
//         expect(res.body).to.have.property("message");
//         expect(res.body.message).to.equal("Success create supplier");
//         expect(res.body).to.have.property("data");
//         supplierId = res.body.data.id;
//         name = res.body.data.name;
//         alamat = res.body.data.alamat;
//         done();
//       });
//   });

//   /*
//    * POST api/suppliers
//    * cek didalam database
//    */
//   it("Should create supplier in database", (done) => {
//     Supplier.findOne({
//       where: {
//         id: supplierId
//       }
//     }).then((supplier) => {
//       expect(supplier.name).to.equal(name);
//       expect(supplier.alamat).to.equal(alamat);
//       done();
//     });
//   });

//   /*
//    * PUT api/suppliers/2
//    *
//    */
//   it("should update supplier info", (done) => {
//     chai
//       .request(app)
//       .put(`/api/suppliers/${supplierId}`)
//       .send({ name: "Iwann", alamat: "jawa" })
//       .end((err, res) => {
//         expect(res).to.have.status(201);
//         expect(res).to.be.json;
//         expect(res.body).to.have.property("message");
//         expect(res.body.message).to.equal("Success update supplier");
//         expect(res.body).to.have.property("data");
//         name = res.body.data.name;
//         alamat = res.body.data.alamat;
//         done();
//       });
//   });

//   /*
//    * PUT api/suppliers/2
//    * cek didalam database
//    */
//   it("Should update supplier in database", (done) => {
//     Supplier.findOne({
//       where: {
//         id: supplierId
//       }
//     }).then((supplier) => {
//       expect(supplier.name).to.equal(name);
//       expect(supplier.alamat).to.equal(alamat);
//       done();
//     });
//   });

//   /*
//    * DELETE api/suppliers/2
//    *
//    */
//   it("Should delete a supplier", (done) => {
//     chai
//       .request(app)
//       .del(`/api/suppliers/${supplierId}`)
//       .end((err, res) => {
//         expect(res).to.have.status(200);
//         expect(res).to.be.json;
//         expect(res.body).to.have.property("message");
//         expect(res.body.message).to.equal("Success delete supplier");
//         expect(res.body).to.have.property("data");
//         done();
//       });
//   });

//   /*
//    * DELETE api/suppliers
//    * cek didalam database
//    */
//   it("Should delete supplier in database", (done) => {
//     Supplier.findOne({
//       where: {
//         id: supplierId
//       }
//     }).then((supplier) => {
//       expect(supplier).to.equal(null);
//       done();
//     });
//   });
// });
// ibe("/POST supplier", () => {
//   /*
//    * POST api/suppliers
//    *
//    */
//   it("It sould post the supplier info", (done) => {
//     chai
//       .request(app)
//       .post("/api/suppliers")
//       .send({ name, alamat })
//       .end((err, res) => {
//         expect(res).to.have.status(201);
//         expect(res).to.be.json;
//         expect(res.body).to.have.property("message");
//         expect(res.body.message).to.equal("Success create supplier");
//         expect(res.body).to.have.property("data");
//         supplierId = res.body.data.id;
//         name = res.body.data.name;
//         alamat = res.body.data.alamat;
//         done();
//       });
//   });

//   /*
//    * POST api/suppliers
//    * cek didalam database
//    */
//   it("Should create supplier in database", (done) => {
//     Supplier.findOne({
//       where: {
//         id: supplierId
//       }
//     }).then((supplier) => {
//       expect(supplier.name).to.equal(name);
//       expect(supplier.alamat).to.equal(alamat);
//       done();
//     });
//   });

//   /*
//    * PUT api/suppliers/2
//    *
//    */
//   it("should update supplier info", (done) => {
//     chai
//       .request(app)
//       .put(`/api/suppliers/${supplierId}`)
//       .send({ name: "Iwann", alamat: "jawa" })
//       .end((err, res) => {
//         expect(res).to.have.status(201);
//         expect(res).to.be.json;
//         expect(res.body).to.have.property("message");
//         expect(res.body.message).to.equal("Success update supplier");
//         expect(res.body).to.have.property("data");
//         name = res.body.data.name;
//         alamat = res.body.data.alamat;
//         done();
//       });
//   });

//   /*
//    * PUT api/suppliers/2
//    * cek didalam database
//    */
//   it("Should update supplier in database", (done) => {
//     Supplier.findOne({
//       where: {
//         id: supplierId
//       }
//     }).then((supplier) => {
//       expect(supplier.name).to.equal(name);
//       expect(supplier.alamat).to.equal(alamat);
//       done();
//     });
//   });

//   /*
//    * DELETE api/suppliers/2
//    *
//    */
//   it("Should delete a supplier", (done) => {
//     chai
//       .request(app)
//       .del(`/api/suppliers/${supplierId}`)
//       .end((err, res) => {
//         expect(res).to.have.status(200);
//         expect(res).to.be.json;
//         expect(res.body).to.have.property("message");
//         expect(res.body.message).to.equal("Success delete supplier");
//         expect(res.body).to.have.property("data");
//         done();
//       });
//   });

//   /*
//    * DELETE api/suppliers
//    * cek didalam database
//    */
//   it("Should delete supplier in database", (done) => {
//     Supplier.findOne({
//       where: {
//         id: supplierId
//       }
//     }).then((supplier) => {
//       expect(supplier).to.equal(null);
//       done();
//     });
//   });
// });
// ibe("/POST supplier", () => {
//   /*
//    * POST api/suppliers
//    *
//    */
//   it("It sould post the supplier info", (done) => {
//     chai
//       .request(app)
//       .post("/api/suppliers")
//       .send({ name, alamat })
//       .end((err, res) => {
//         expect(res).to.have.status(201);
//         expect(res).to.be.json;
//         expect(res.body).to.have.property("message");
//         expect(res.body.message).to.equal("Success create supplier");
//         expect(res.body).to.have.property("data");
//         supplierId = res.body.data.id;
//         name = res.body.data.name;
//         alamat = res.body.data.alamat;
//         done();
//       });
//   });

//   /*
//    * POST api/suppliers
//    * cek didalam database
//    */
//   it("Should create supplier in database", (done) => {
//     Supplier.findOne({
//       where: {
//         id: supplierId
//       }
//     }).then((supplier) => {
//       expect(supplier.name).to.equal(name);
//       expect(supplier.alamat).to.equal(alamat);
//       done();
//     });
//   });

//   /*
//    * PUT api/suppliers/2
//    *
//    */
//   it("should update supplier info", (done) => {
//     chai
//       .request(app)
//       .put(`/api/suppliers/${supplierId}`)
//       .send({ name: "Iwann", alamat: "jawa" })
//       .end((err, res) => {
//         expect(res).to.have.status(201);
//         expect(res).to.be.json;
//         expect(res.body).to.have.property("message");
//         expect(res.body.message).to.equal("Success update supplier");
//         expect(res.body).to.have.property("data");
//         name = res.body.data.name;
//         alamat = res.body.data.alamat;
//         done();
//       });
//   });

//   /*
//    * PUT api/suppliers/2
//    * cek didalam database
//    */
//   it("Should update supplier in database", (done) => {
//     Supplier.findOne({
//       where: {
//         id: supplierId
//       }
//     }).then((supplier) => {
//       expect(supplier.name).to.equal(name);
//       expect(supplier.alamat).to.equal(alamat);
//       done();
//     });
//   });

//   /*
//    * DELETE api/suppliers/2
//    *
//    */
//   it("Should delete a supplier", (done) => {
//     chai
//       .request(app)
//       .del(`/api/suppliers/${supplierId}`)
//       .end((err, res) => {
//         expect(res).to.have.status(200);
//         expect(res).to.be.json;
//         expect(res.body).to.have.property("message");
//         expect(res.body.message).to.equal("Success delete supplier");
//         expect(res.body).to.have.property("data");
//         done();
//       });
//   });

//   /*
//    * DELETE api/suppliers
//    * cek didalam database
//    */
//   it("Should delete supplier in database", (done) => {
//     Supplier.findOne({
//       where: {
//         id: supplierId
//       }
//     }).then((supplier) => {
//       expect(supplier).to.equal(null);
//       done();
//     });
//   });
// });
// ibe("/POST supplier", () => {
//   /*
//    * POST api/suppliers
//    *
//    */
//   it("It sould post the supplier info", (done) => {
//     chai
//       .request(app)
//       .post("/api/suppliers")
//       .send({ name, alamat })
//       .end((err, res) => {
//         expect(res).to.have.status(201);
//         expect(res).to.be.json;
//         expect(res.body).to.have.property("message");
//         expect(res.body.message).to.equal("Success create supplier");
//         expect(res.body).to.have.property("data");
//         supplierId = res.body.data.id;
//         name = res.body.data.name;
//         alamat = res.body.data.alamat;
//         done();
//       });
//   });

//   /*
//    * POST api/suppliers
//    * cek didalam database
//    */
//   it("Should create supplier in database", (done) => {
//     Supplier.findOne({
//       where: {
//         id: supplierId
//       }
//     }).then((supplier) => {
//       expect(supplier.name).to.equal(name);
//       expect(supplier.alamat).to.equal(alamat);
//       done();
//     });
//   });

//   /*
//    * PUT api/suppliers/2
//    *
//    */
//   it("should update supplier info", (done) => {
//     chai
//       .request(app)
//       .put(`/api/suppliers/${supplierId}`)
//       .send({ name: "Iwann", alamat: "jawa" })
//       .end((err, res) => {
//         expect(res).to.have.status(201);
//         expect(res).to.be.json;
//         expect(res.body).to.have.property("message");
//         expect(res.body.message).to.equal("Success update supplier");
//         expect(res.body).to.have.property("data");
//         name = res.body.data.name;
//         alamat = res.body.data.alamat;
//         done();
//       });
//   });

//   /*
//    * PUT api/suppliers/2
//    * cek didalam database
//    */
//   it("Should update supplier in database", (done) => {
//     Supplier.findOne({
//       where: {
//         id: supplierId
//       }
//     }).then((supplier) => {
//       expect(supplier.name).to.equal(name);
//       expect(supplier.alamat).to.equal(alamat);
//       done();
//     });
//   });

//   /*
//    * DELETE api/suppliers/2
//    *
//    */
//   it("Should delete a supplier", (done) => {
//     chai
//       .request(app)
//       .del(`/api/suppliers/${supplierId}`)
//       .end((err, res) => {
//         expect(res).to.have.status(200);
//         expect(res).to.be.json;
//         expect(res.body).to.have.property("message");
//         expect(res.body.message).to.equal("Success delete supplier");
//         expect(res.body).to.have.property("data");
//         done();
//       });
//   });

//   /*
//    * DELETE api/suppliers
//    * cek didalam database
//    */
//   it("Should delete supplier in database", (done) => {
//     Supplier.findOne({
//       where: {
//         id: supplierId
//       }
//     }).then((supplier) => {
//       expect(supplier).to.equal(null);
//       done();
//     });
//   });
// });
// describe("/PUT/:id supplier", () => {
//   /*
//    * PUT api/suppliers/2
//    *
//    */
//   it("should update supplier info", (done) => {
//     chai
//       .request(app)
//       .put(`/api/suppliers/${supplierId}`)
//       .send({ name: "Iwann", alamat: "jawa" })
//       .end((err, res) => {
//         expect(res).to.have.status(201);
//         expect(res).to.be.json;
//         expect(res.body).to.have.property("message");
//         expect(res.body.message).to.equal("Success update supplier");
//         expect(res.body).to.have.property("data");
//         name = res.body.data.name;
//         alamat = res.body.data.alamat;
//         done();
//       });
//   });
//   /*
//    * PUT api/suppliers/2
//    * cek didalam database
//    */
//   it("Should update supplier in database", (done) => {
//     Supplier.findOne({
//       where: {
//         id: supplierId
//       }
//     }).then((supplier) => {
//       expect(supplier.name).to.equal(name);
//       expect(supplier.alamat).to.equal(alamat);
//       done();
//     });
//   });
// });

// describe("/DELETE/:id supplier", () => {
//   /*
//    * DELETE api/suppliers/2
//    *
//    */
//   it("Should delete a supplier", (done) => {
//     chai
//       .request(app)
//       .del(`/api/suppliers/${supplierId}`)
//       .end((err, res) => {
//         expect(res).to.have.status(200);
//         expect(res).to.be.json;
//         expect(res.body).to.have.property("message");
//         expect(res.body.message).to.equal("Success delete supplier");
//         expect(res.body).to.have.property("data");
//         done();
//       });
//   });
/*
 * DELETE api/suppliers
 * cek didalam database
 */
//   it("Should delete supplier in database", (done) => {
//     Supplier.findOne({
//       where: {
//         id: supplierId
//       }
//     }).then((supplier) => {
//       expect(supplier).to.equal(null);
//       done();
//     });
//   });
// });
