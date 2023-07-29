let express = require("express");
let router = new express.Router();
let { productController } = require('../controllers');
const { index, updated, create } = productController;
let { Auth } = require('../middlewares');
const { tokenAuth } = Auth


router.get("", index);
// router.get("/:id",);
router.post("", create);
router.put("/:id", tokenAuth, updated);
// router.delete("/:id",);

module.exports = router;