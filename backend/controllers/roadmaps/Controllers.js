let { sendOk, sendErr } = require('./../../components')
const db = require("../../models");
const { roadmaps,roadmaps_details } = db;

let index = async (req, res) => {
  const { user } = req
  if (user) {
    try {
      var data = await roadmaps.findAll({
        include: [
          {
            model: roadmaps_details,
          }
        ]
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
  const { user, body, params } = req;
  const { id } = params;

  if (user) {
    try {
      var oldSetting = await roadmaps.findOne({where: {id: id}})
      oldSetting.update({
        ...oldSetting,
        ...body
      }).then(async (updatedTask) => {
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