let express = require("express");
let router = new express.Router();
let { UserController } = require('../controllers');
const { signIn, signUp, index, signInByToken, exportToScv } = UserController;
let { Auth } = require('../middlewares');
const { accountAuth, tokenAuth, hasEmail, hasEmailVerify } = Auth


router.get("", tokenAuth, index);
// router.get("/:id",);
router.post("", hasEmail, signUp);
router.post("/signIn", hasEmailVerify, signIn);
router.get("/signIn", tokenAuth, signInByToken);
router.get("/exports", tokenAuth, exportToScv);
// router.put("/:id",);
// router.delete("/:id",);

module.exports = router;