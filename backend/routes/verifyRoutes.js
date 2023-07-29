let express = require("express");
let router = new express.Router();
let { verifyController } = require('../controllers');
const { verifySignUp } = verifyController;


router.get("/:id/signup",verifySignUp);

module.exports = router;