let express = require("express");
let router = new express.Router();
let { UploadsController } = require('../controllers');
const { upload, updateSuccess }= UploadsController;
let {Auth} = require('../middlewares');
const {tokenAuth}= Auth


// router.get("/:id",);
router.post("",upload.single('profileImg'),updateSuccess);
// router.put("/:id",);
// router.delete("/:id",);

module.exports = router;