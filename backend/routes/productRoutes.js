const routeName = 'ProductController';
let controllers = require('../controllers');
let BaseController = controllers[routeName];
let express = require("express");
let router = new express.Router();

router.get("", BaseController.index);
router.get("/:id",BaseController.show);
router.post("", BaseController.create);
router.put("/:id", BaseController.updated);
// router.delete("/:id",);

module.exports = router;