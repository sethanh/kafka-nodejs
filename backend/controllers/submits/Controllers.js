let { sendOk, sendErr } = require('./../../components')
const db = require("../../models");
const { submits } = db;

let index = async (req, res) => {
    try {
      var data = await submits.findAll({
      })
      return sendOk({
        res: res,
        status: 200,
        message: 'Success',
        data: data,
      });
    }
    catch (err) {
      return sendErr({
        res: res,
        message: JSON.stringify(err),
        status: 500
      })
    }
}

let show = async (req, res, next) => {
  const { params } = req;
  const { id } = params;
};

let destroy = async (req, res, next) => {
  const { params } = req;
  const { id } = params;
};

let updated = async (req, res, next) => {
};

let post = async (req, res, next) => {
  const { body } = req;

  try {
      data = await submits.create({ ...body});
    return sendOk({
      res,
      status: 200,
      message: 'Registration is successful, to continue please check your account verification email',
      data: code,
      error: false
    });
  } catch (err) {
    return sendErr({
      res: res,
      message: JSON.stringify(err),
      status: 500
    })
  }
};



module.exports = { index, show, updated, destroy, post };