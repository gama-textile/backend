var express = require("express");
var router = express.Router();
var {
  index,
  create,
  find,
  update,
  destroy
} = require("../controllers/bankController");

router.get("/", index);
router.post("/", create);
router.get("/:id", find);
router.put("/:id", update);
router.delete("/:id", destroy);

module.exports = router;

// router.get("/", (req, res) => {
// 	/*
// 	 * GET api/banks
// 	 * this function display all banks
// 	 */
// 	Bank.findAll()
// 		.then((banks) => {
// 			res.status(200).json({ data: banks, message: "Success read all banks" });
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 			res.status(500).json({ message: " Internal server error" });
// 		});
// });

// router.post("/", (req, res) => {
// 	/*
// 	 * POST api/banks
// 	 * this function add banks
// 	 */
// 	const { name, nomorRekening } = req.body;
// 	Bank.create({ name, nomorRekening })
// 		.then((bank) => {
// 			res.status(201).json({ data: bank, message: "Success create bank" });
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 			res.status(500).json({ message: "Internal server error" });
// 		});
// });

// router.get("/:id", (req, res) => {
// 	/*
// 	 * GET api/banks/2
// 	 * this function get a single bank
// 	 */

// 	const bankid = req.params.id;

// 	Bank.findOne({ where: { id: { [Op.eq]: bankid } } })
// 		.then((bank) => {
// 			res.status(200).json({ data: bank, message: "Success getting bank" });
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 			res.status(500).json({ message: "Internal server error" });
// 		});
// });

// router.put("/:id", (req, res) => {
// 	/*
// 	 * PUT api/banks/2
// 	 * Update single bank
// 	 */
// 	const bankId = req.params.id;
// 	const { name, nomorRekening } = req.body;

// 	Bank.findOne({ where: { id: { [Op.eq]: bankId } } })
// 		.then((bank) => {
// 			if (bank) {
// 				return bank.update({ name, nomorRekening }).then((bank) => {
// 					res.status(201).json({ data: bank, message: "Success update bank" });
// 				});
// 			} else {
// 				res.status(400).json({ message: "bank not found" });
// 			}
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 			res.status(500).json({ message: "Internal server error" });
// 		});
// });

// router.delete("/:id", (req, res) => {
// 	/*
// 	 * DELETE api/banks/2
// 	 * Delete a bank with the given id
// 	 */

// 	const bankId = req.params.id;

// 	Bank.findOne({ where: { id: { [Op.eq]: bankId } } })
// 		.then((bank) => {
// 			return bank.destroy();
// 		})
// 		.then((bank) => {
// 			res.status(200).json({ data: bank, message: "Success delete bank" });
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 			res.status(500).json({ message: "Internal server error" });
// 		});
// });

// module.exports = router;
