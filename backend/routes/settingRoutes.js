let express = require("express");
let router = new express.Router();
let { SettingController } = require('../controllers');
const {index,updated} = SettingController;
let { Auth } = require('../middlewares');
const {  tokenAuth} = Auth


router.get("", tokenAuth, index);
// router.get("/:id",);
//router.post("", hasEmail, signUp);
router.put("",tokenAuth,updated);
// router.delete("/:id",);

module.exports = router;