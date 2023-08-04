const Service = require('../services')
let BaseService = Service.UserServices;
let { GenerateServices } = Service;
let RES = require('./../responses')
var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
let { Key } = require('../key/keyJWT');
let { TYPE_GENERATE_CODE, GENERATE_CODE } = require('../key/Constants');

let index = async (req, res) => {
  var datas = await BaseService.GetAll();
  if (datas.QueryError) { return RES.Error(res, datas.Message) }

  return RES.OkList(res, { data: datas }, 0);
}

let show = async (req, res, next) => {
  const { params } = req;
  const { id } = params;
  var result = {};

  var data = await BaseService.FirstOrDefault({ id });
  if (data.QueryError) { return RES.Error(res, data.Message) }

  result.data = data;
  return RES.Ok(res, result);
};

let exportToScv = async (req, res) => {
}

let signInByToken = async (req, res, next) => {
  const { user } = req;
  if (user) {
    return RES.Ok(res, { data: user })
  }
  else return RES.Error(res, 'Account is not existed');
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

      return RES.Ok(res, { token, user })
    }

    else return RES.NotFound(res);
  }

  RES.NotFound(res);
};

let signUp = async (req, res, next) => {
  const { password, secret, user, code, ...body } = req.body;

  if (user) { return RES.BadRequest(res, 'Email already exists'); }

  body.status = 0;
  body.rule = 'Customer';

  let salt = bcrypt.genSaltSync(saltRounds);
  let passwordHash = bcrypt.hashSync(password, salt);
  let newcode = code;

  var old_code = await GenerateServices.FirstOrDefault({ head: TYPE_GENERATE_CODE.USER });
  newcode = `${GENERATE_CODE.USER}${old_code.code + 1}`;

  var update_code = await GenerateServices.Update(old_code, {...old_code,code: old_code.code + 1});
  if (update_code.QueryError) { return RES.Error(res, update_code.Message) }

  var newUser = await BaseService.Add({ ...body, code: newcode, password: passwordHash });
  if (newUser.QueryError) { return RES.Error(res, newUser.Message) }

  var result = {
    message: 'Registration is successful, to continue please check your account verification email',
    data: newUser,
  }

  return RES.Ok(res, result);
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