const controllerName = "User";
const Service = require('../services')
let BaseService = Service[`${controllerName}Services`]
let RES = require('./../responses')
var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
let { Key, managerKey } = require('./../key/keyJWT');
const db = require("../models");
const mailer = require('../utils/mailer');

const { users, generaties } = db;
let { sendOk, sendErr } = require('./../components');

let index = async (req, res) => {
  var result = {};
  var allUsers = await BaseService.GetAll();

  if (allUsers.QueryError) { return RES.Error(res, allUsers.Message) }

  result.data = allUsers;
  return RES.OkList(res, result, 0);
}

let exportToScv = async (req, res) => {
}

let signInByToken = async (req, res, next) => {
  const { user } = req;
  if (user) {
    sendOk({
      res: res,
      message: 'success',
      status: 200,
      data: user,
    })
  }
  else return sendErr({
    res: res,
    message: 'Không tồn tại tài khoản',
    status: 500
  })
};


let signIn = async (req, res, next) => {
  const { body, user } = req;
  const { password } = body;
  if (user) {
    const passwordHash = req.user.password;
    let data = bcrypt.compareSync(password, passwordHash);
    if (data) {
      var token = jwt.sign({ id: req.user.id }, Key, { expiresIn: '5h' });
      res.cookie('token', token, { maxAge: 24 * 60 * 60 * 1000 });
      return sendOk({
        res,
        token,
        user,
        status: 200,
        message: 'Success',
        error: false
      })
    }

    else return sendErr({
      res: res,
      message: 'Account not valid or not verified',
      status: 400
    })
  }

  return sendErr({
    res: res,
    message: 'Account not valid or not verified',
    status: 400
  })
};

let signUp = async (req, res, next) => {
  const { password, secret, user, code, ...body } = req.body;

  if (user) { return RES.BadRequest(res, 'Email already exists'); }

  body.status = 0;
  body.rule = 'Customer';

  let salt = bcrypt.genSaltSync(saltRounds);
  let passwordHash = bcrypt.hashSync(password, salt);

  try {
    let data = {};
    let newcode = code;
    if (code) {
      var newUser = { ...body, code: newcode, password: passwordHash };
      data = await BaseService.Add(newUser);
    }
    else {
      var old_code = await generaties.findOne({ where: { head: "WIREICO" } });
      newcode = `WIREICO${old_code.code + 1}`;
      old_code.update({
        ...old_code,
        code: old_code.code + 1
      }).then(async (updated) => {
        var newUser = { ...body, code: newcode, password: passwordHash };
        data = await BaseService.Add(newUser);
      })
        .catch((err) => {
          return RES.Error(res, JSON.stringify(err))
        });
    }

    var result = {
      message: 'Registration is successful, to continue please check your account verification email',
      data: data,
    }

    return RES.Ok(res, result);

  } catch (err) {
    return RES.Error(res, JSON.stringify(err))
  }
};

let show = async (req, res, next) => {
  const { params } = req;
  const { id } = params;
};

let updated = async (req, res, next) => {
  const { params } = req;
  const { id } = params;
};

let destroy = async (req, res, next) => {
  const { params } = req;
  const { id } = params;

};



module.exports = { signUp, signIn, index, show, updated, destroy, signInByToken, exportToScv };