let { sendOk, sendErr, meta, overView, searchKeyWord } = require('./../../components')
var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
let { Key, managerKey } = require('./../../key/keyJWT');
const db = require("../../models");
const mailer = require('../../utils/mailer');
const { contentEmail } = require('./Services')
const { users, generaties } = db;

let index = async (req, res) => {
  const { user } = req;
  var { type, page, keyword } = req.query;
  if (user) {
    try {
      let data = {}
      if (type) {
        data = await users.findAll({
          where: {
            rule: type
          },
          attributes: ['id', 'code', 'phone', 'first_name', 'last_name', 'email', 'address', 'rule', 'status', 'referral_by', 'created_by', 'createdAt', 'updatedAt']
        })
      }
      else {
        data = await users.findAll({
          attributes: ['id', 'code', 'phone', 'first_name', 'last_name', 'email', 'address', 'rule', 'status', 'referral_by', 'created_by', 'createdAt', 'updatedAt']
        })
      }

      if (keyword) {
        email_data = await searchKeyWord(data, 'email', keyword);
        phone_data = await searchKeyWord(data, 'phone', keyword);
        data = [...email_data, ...phone_data];
        data = [...new Set(data)];
      }

      var page_data = data.slice((page - 1) * 25, page * 25);
      var lastdate = new Date();
      lastdate.setDate(lastdate.getDate() - 1);

      const overViews = [
        { title: 'total_referral', key: 'referral_by', type: "!==", value: null },
        { title: 'banned', key: 'createdAt', type: "===", value: 2 }
      ]

      var over_view = await overView(data, overViews)

      over_view.last_day = data.filter(item => new Date(item.createdAt) > lastdate).length;


      var metaData = await meta(data, page)

      return sendOk({
        res: res,
        status: 200,
        message: 'Success',
        data: page_data,
        over_view,
        meta: metaData
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
  else return sendErr({
    res: res,
    message: 'Lỗi xác thực',
    status: 500
  })

}

let exportToScv = async (req, res) => {
  const { user } = req;
  var { type, keyword } = req.query;
  if (user) {
    try {
      let data = {}
      if (type) {
        data = await users.findAll({
          where: {
            rule: type
          },
          attributes: ['code', 'phone', 'first_name', 'last_name', 'email', 'address', 'rule', 'status', 'referral_by', 'created_by', 'createdAt', 'updatedAt']
        })
      }
      else {
        data = await users.findAll({
          attributes: ['code', 'phone', 'first_name', 'last_name', 'email', 'address', 'rule', 'status', 'referral_by', 'created_by', 'createdAt', 'updatedAt']
        })
      }

      if (keyword) {
        email_data = await searchKeyWord(data, 'email', keyword);
        phone_data = await searchKeyWord(data, 'phone', keyword);
        data = [...email_data, ...phone_data];
        data = [...new Set(data)];
      }

      const length = data.length;
      var exportData = []
      for (let i = 0; i < length; i++) {
        exportData.push(
          {
            'UserID': data[i].code,
            'Email': data[i].email,
            'Name': `${data[i].first_name} ${data[i].last_name}`,
            'Phone': data[i].phone,
            'Signed up': data[i].createdAt,
            'Referral by': data[i].referral_by,
          }
        )
      }

      return sendOk({
        res: res,
        status: 200,
        message: 'Success',
        data: exportData
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
  else return sendErr({
    res: res,
    message: 'Lỗi xác thực',
    status: 500
  })

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

  if (user) {
    return sendErr({
      res: res,
      message: 'Email already exists',
      status: 409
    })
  }

  body.status = 0;

  if (secret === Key) {
    body.rule = 'Admin';
    body.status = 1;
  }
  else if (secret === managerKey) {
    body.rule = 'Manager'
    body.status = 1;
  }
  else {
    body.rule = 'Customer';
  }

  let salt = bcrypt.genSaltSync(saltRounds);
  let passwordHash = bcrypt.hashSync(password, salt);

  try {
    let data = {};
    let newcode = code;
    if (code) {
      data = await users.create({ ...body, code: newcode, password: passwordHash });
    }
    else {
      var old_code = await generaties.findOne({ where: { head: "WIREICO" } });
      newcode = `WIREICO${old_code.code + 1}`;
      old_code.update({
        ...old_code,
        code: old_code.code + 1
      }).then(async (updated) => {
        console.log('ok', updated);
        data = await users.create({ ...body, code: newcode, password: passwordHash });
      })
        .catch((err) => {
          return sendErr({
            res: res,
            message: JSON.stringify(err),
            status: 420
          })
        });
    }

    mailer.sendMail(body.email, "Verify Email", contentEmail(process.env.APP_URL, newcode, body.email))

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