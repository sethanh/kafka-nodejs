const Service = require('../services');
let BaseService = Service.ProductServices;
let { GenerateServices } = Service;
let RES = require('./../responses');

let index = async (req, res) => {
  var datas = await BaseService.GetAll();
  if (datas.QueryError) { return RES.Error(res, datas.Message) }

  return RES.OkList(res, { data: datas }, 0);
}

let show = async (req, res, next) => {
  const { params } = req;
  const { id } = params;

  var data = await BaseService.FirstOrDefault({ id });
  if (data.QueryError) { return RES.Error(res, data.Message) }

  return RES.Ok(res, { data });
};

let destroy = async (req, res, next) => {
  const { params } = req;
  const { id } = params;
};

let create = async (req, res, next) => {
  const { user, ...body } = req.body;

  var number = await GenerateServices.FirstOrDefault({ head: "PRODUCT" });
  var newcode = `MASP${number.code + 1}`;
  var x = number.code + 1;
  var updateNumber = await GenerateServices.Update(number, { ...number, code: number.code + 1 });
  console.log(x,updateNumber);

  data = await BaseService.Add({ ...body, product_code: newcode });
  if (data.QueryError) { return RES.Error(res, data.Message) }

  return RES.Ok(res, { data });
};


let updated = async (req, res, next) => {
  const { params } = req;
  const { id } = params;
};

module.exports = { index, show, updated, destroy, create };