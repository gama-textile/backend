var express = require("express");
var router = express.Router();
var { index, show, create, update, destroy } = require('../controllers/cartController')

router.get('/', index);
router.get('/:id', show);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', destroy);

module.exports = router;