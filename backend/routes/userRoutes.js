const routeName = 'UserController';
let express = require("express");
let router = new express.Router();
let controllers = require('../controllers');
let BaseController = controllers[routeName];
let { Auth } = require('../middlewares');
const { accountAuth, tokenAuth, hasEmail, hasEmailVerify } = Auth


// router.get("", BaseController.index);
router.get("", BaseController.index);
// router.get("/:id",);
router.post("", hasEmail, BaseController.signUp);
router.post("/signIn", hasEmailVerify, BaseController.signIn);
router.get("/signIn", BaseController.signInByToken);
router.get("/exports", BaseController.exportToScv);
// router.put("/:id",);
// router.delete("/:id",);

module.exports = router;