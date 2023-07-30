let express = require("express");
let router = new express.Router();
let { VerifyController } = require('../controllers');
const { verifySignUp } = VerifyController;


router.get("/:id/signup",verifySignUp);

module.exports = router;