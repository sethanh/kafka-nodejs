const userController = require('./users/Controllers');
const uploadsController= require('./uploads/Controllers');
const settingController = require('./settings/Controllers');
const verifyController = require('./verifies/Controllers');
const social_settingController = require('./social_settings/Controllers');
const roadmapController = require('./roadmaps/Controllers');
const submitController = require('./submits/Controllers');
const productController = require('./products/Controllers');
const invoiceController = require('./invocies/Controllers');

module.exports = { 
    userController, 
    uploadsController,
    settingController,
    verifyController,
    social_settingController,
    roadmapController,
    submitController,
    productController,
    invoiceController
 };