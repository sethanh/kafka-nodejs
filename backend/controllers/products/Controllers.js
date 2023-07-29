let { sendOk, sendErr } = require('./../../components')
const db = require("../../models");
const { products, generaties } = db;

let index = async (req, res) => {
  const { user } = req
  if (user) {
    try {
      var data = await products.findAll({
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

let create = async (req, res, next) => {
  const { user, ...body } = req.body;

  var number = await generaties.findOne({ where: { head: "PRODUCT" } });
  var newcode = `MASP${number.code + 1}`;
  number.update(
    {
      ...number,
      code : number.code +1
    }
  );

  data = await products.create({ ...body, product_code: newcode });

  return sendOk({
    res,
    status: 200,
    message: 'Tạo Sản Phẩm thành công',
    data: data,
    error: false
  });
};


let updated = async (req, res, next) => {
  const { user, body, params } = req;
  const { id } = params;

  if (user) {
    try {
      var oldSetting = await roadmaps.findOne({ where: { id: id } })
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

module.exports = { index, show, updated, destroy, create };