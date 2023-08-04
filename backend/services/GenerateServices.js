const db = require("../models");
const BaseService = require('./BaseService');

let GetBaseModel = (name = 'generaties') => {
    return base = db[name];
}

var GetAll = async (filters) => {
    var base = GetBaseModel();
    return BaseService.GetAll(base, filters);
}

var FirstOrDefault = async (filters) => {
    var base = GetBaseModel();
    return BaseService.FirstOrDefault(base, filters);
}

var Add = async (data) => {
    var base = GetBaseModel();
    console.log(base);
    return BaseService.Add(base, data);
}

var Update = async (OBJ, newOBJ) => {
    return BaseService.Update(OBJ, newOBJ);
}



module.exports = { GetAll, FirstOrDefault, Add, Update };