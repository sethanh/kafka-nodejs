let express = require("express");
let router = new express.Router();
let { SubmitController } = require('../controllers');
const { index, show, updated, destroy, post } = SubmitController;
let { Auth } = require('../middlewares');
const { accountAuth, tokenAuth, hasEmail, hasEmailVerify } = Auth


router.get("", index);
// router.get("/:id",);
router.post("", post);
// router.post("/signIn", hasEmailVerify, signIn);
// router.get("/signIn", tokenAuth, signInByToken);
// router.get("/exports", tokenAuth, exportToScv);
// router.put("/:id",);
// router.delete("/:id",);

module.exports = router;