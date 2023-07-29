let { sendOk, sendErr } = require('./../../components')
const db = require("../../models");
const { settings } = db;
const { admin } = require("../../firebase")

let index = async (req, res) => {
  const { user } = req
  if (user) {
    try {
      var data = await settings.findOne()
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
  else return sendErr({
    res: res,
    message: 'Lỗi xác thực',
    status: 500
  })

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

  const { user, body } = req;

  if (user) {
    try {
      var oldSetting = await settings.findOne()
      var bodyFirebase={
        comming_soon: oldSetting.dataValues.comming_soon,
        signup_count_down: new Date(oldSetting.dataValues.signup_count_down).toISOString(),
        ico_count_down: new Date(oldSetting.dataValues.ico_count_down).toISOString(),
        final_lander_page: new Date(oldSetting.dataValues.final_lander_page).toDateString(),
        ...body
      }

      console.log('x',bodyFirebase)

      oldSetting.update({
        ...oldSetting,
        ...body
      }).then(async (updatedTask) => {
        admin.database().ref('Settings/one').set({
         ...bodyFirebase
        })

        return sendOk({
          res: res,
          status: 200,
          message: 'Success',
          data: updatedTask,
        });
      })
        .catch((err) => {
          return sendErr({
            res: res,
            message: JSON.stringify(err),
            status: 420
          })
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

};



module.exports = { index, show, updated, destroy };