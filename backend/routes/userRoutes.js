const routeName = 'UserController';
let controllers = require('../controllers');
let BaseController = controllers[routeName];
let { Auth } = require('../middlewares');
const { hasEmail, hasEmailVerify } = Auth;
let express = require("express");
let router = new express.Router();


// router.get("", BaseController.index);
router.get("", BaseController.index);
router.get("/:id", BaseController.show);
router.post("", hasEmail, BaseController.signUp);
router.post("/signIn", hasEmailVerify, BaseController.signIn);
router.get("/signIn", BaseController.signInByToken);
router.get("/exports", BaseController.exportToScv);
// router.put("/:id",);
// router.delete("/:id",);

module.exports = router;