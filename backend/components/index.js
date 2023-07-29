let restApis = require('./restApis');
let datamodels = require('./datamodels');
const { sendOk, sendErr, meta, overView , searchKeyWord } = restApis;
const { requestModel } = datamodels;
module.exports = { sendOk, requestModel, sendErr, meta, overView, searchKeyWord }