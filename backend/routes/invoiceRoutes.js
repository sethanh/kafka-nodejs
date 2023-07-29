let express = require("express");
let router = new express.Router();
let { invoiceController } = require('../controllers');
const { index, updated, create, show } = invoiceController;
let { Auth } = require('../middlewares');
const { tokenAuth } = Auth


router.get("", index);
router.get("/:id",show);
router.post("", create);
router.put("/:id", tokenAuth, updated);
// router.delete("/:id",);

module.exports = router;