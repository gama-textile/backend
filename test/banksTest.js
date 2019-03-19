process.env.NODE_ENV = "test";

const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
const app = require("../app");
const { Bank } = require("../models");

chai.use(chaiHttp);

var bankId = "";
var name = "Mandiri";
var nomorRekening = "009-000-000";
describe("Banks Crud", () => {
  /*
   * GET api/banks
   *
   */
  it("It should get all banks", (done) => {
    chai
      .request(app)
      .get("/api/banks")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.have.property("message");
        expect(res.body.message).to.equal("Success read all banks");
        expect(res.body).to.have.property("data");
        done();
      });
  });

  /*
   * POST api/banks
   *
   */
  it("It sould post the banks info", (done) => {
    chai
      .request(app)
      .post("/api/banks")
      .send({ name, nomorRekening })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res).to.be.json;
        expect(res.body).to.have.property("message");
        expect(res.body.message).to.equal("Success create bank");
        expect(res.body).to.have.property("data");
        bankId = res.body.data.id;
        name = res.body.data.name;
        nomorRekening = res.body.data.nomorRekening;
        done();
      });
  });

  /*
   * POST api/banks
   * cek didalam database
   */
  it("Should create bank in database", (done) => {
    Bank.findOne({
      where: {
        id: bankId
      }
    }).then((bank) => {
      expect(bank.name).to.equal(name);
      expect(bank.nomorRekening).to.equal(nomorRekening);
      done();
    });
  });

  /*
   * PUT api/banks/2
   *
   */
  it("should update bank info", (done) => {
    chai
      .request(app)
      .put(`/api/banks/${bankId}`)
      .send({ name: "BCA", nomorRekening: "009-002-001" })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res).to.be.json;
        expect(res.body).to.have.property("message");
        expect(res.body.message).to.equal("Success update bank");
        expect(res.body).to.have.property("data");
        name = res.body.data.name;
        nomorRekening = res.body.data.nomorRekening;
        done();
      });
  });

  /*
   * PUT api/banks/2
   * cek didalam database
   */
  it("Should update bank in database", (done) => {
    Bank.findOne({
      where: {
        id: bankId
      }
    }).then((bank) => {
      expect(bank.name).to.equal(name);
      expect(bank.nomorRekening).to.equal(nomorRekening);
      done();
    });
  });

  /*
   * DELETE api/banks/2
   *
   */
  it("Should delete a bank", (done) => {
    chai
      .request(app)
      .del(`/api/banks/${bankId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.have.property("message");
        expect(res.body.message).to.equal("Success delete bank");
        expect(res.body).to.have.property("data");
        done();
      });
  });
  /*
   * DELETE api/banks
   * cek didalam database
   */
  it("Should delete bank in database", (done) => {
    Bank.findOne({
      where: {
        id: bankId
      }
    }).then((bank) => {
      expect(bank).to.equal(null);
      done();
    });
  });
});

// describe("/POST banks", () => {
//   /*
//    * POST api/banks
//    *
//    */
//   it("It sould post the banks info", (done) => {
//     chai
//       .request(app)
//       .post("/api/banks")
//       .send({ name, nomorRekening })
//       .end((err, res) => {
//         expect(res).to.have.status(201);
//         expect(res).to.be.json;
//         expect(res.body).to.have.property("message");
//         expect(res.body.message).to.equal("Success create bank");
//         expect(res.body).to.have.property("data");
//         bankId = res.body.data.id;
//         name = res.body.data.name;
//         nomorRekening = res.body.data.nomorRekening;
//         done();
//       });
//   });

//   /*
//    * POST api/banks
//    * cek didalam database
//    */
//   it("Should create bank in database", (done) => {
//     Bank.findOne({
//       where: {
//         id: bankId
//       }
//     }).then((bank) => {
//       expect(bank.name).to.equal(name);
//       expect(bank.nomorRekening).to.equal(nomorRekening);
//       done();
//     });
//   });
// });

// describe("/PUT/:id bank", () => {
//   /*
//    * PUT api/banks/2
//    *
//    */
//   it("should update bank info", (done) => {
//     chai
//       .request(app)
//       .put(`/api/bankS/${bankId}`)
//       .send({ name: "BCA", nomorRekening: "009-002-001" })
//       .end((err, res) => {
//         expect(res).to.have.status(201);
//         expect(res).to.be.json;
//         expect(res.body).to.have.property("message");
//         expect(res.body.message).to.equal("Success update bank");
//         expect(res.body).to.have.property("data");
//         name = res.body.data.name;
//         nomorRekening = res.body.data.nomorRekening;
//         done();
//       });
//   });
//   /*
//    * PUT api/banks/2
//    * cek didalam database
//    */
//   it("Should update bank in database", (done) => {
//     Bank.findOne({
//       where: {
//         id: bankId
//       }
//     }).then((bank) => {
//       expect(bank.name).to.equal(name);
//       expect(bank.nomorRekening).to.equal(nomorRekening);
//       done();
//     });
//   });
// });

// describe("/DELETE/:id bank", () => {
//   /*
//    * DELETE api/banks/2
//    *
//    */
//   it("Should delete a bank", (done) => {
//     chai
//       .request(app)
//       .del(`/api/banks/${bankId}`)
//       .end((err, res) => {
//         expect(res).to.have.status(200);
//         expect(res).to.be.json;
//         expect(res.body).to.have.property("message");
//         expect(res.body.message).to.equal("Success delete bank");
//         expect(res.body).to.have.property("data");
//         done();
//       });
//   });
//   /*
//    * DELETE api/banks
//    * cek didalam database
//    */
//   it("Should delete bank in database", (done) => {
//     Bank.findOne({
//       where: {
//         id: bankId
//       }
//     }).then((bank) => {
//       expect(bank).to.equal(null);
//       done();
//     });
//   });
// });
