let express = require("express");
let router = new express.Router();
let { SocialSettingController } = require('../controllers');
const {index,updated} = SocialSettingController;
let { Auth } = require('../middlewares');
const {  tokenAuth} = Auth


router.get("", tokenAuth, index);
// router.get("/:id",);
//router.post("", hasEmail, signUp);
router.put("/:id",tokenAuth,updated);
// router.delete("/:id",);

module.exports = router;