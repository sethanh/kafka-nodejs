const { result } = require("lodash");

let Ok = (res, result) => {
    return res.status(200).send({
        message: "success",
        ...result,
        err: false
    });
};

let OkList = (res, result, page) => {

    // let Meta = OkMeta(result, page);

    return res.status(200).send({
        message: "success",
        ...result,
        err: false,
        // Meta
    });
};

let BadRequest =  (res, message) => {
    return res.status(400).send({
        message: message,
        err: true,
        // Meta
    });
};

let Forbidden = (res) => {
    return res.status(403).send({
        ...result,
        err: true,
        // Meta
    });
};

let NotFound = (res) => {

    // let Meta = OkMeta(result, page);
    return res.status(404).send({
        err: true,
    });
};

let Error = (res, message) => {

    // let Meta = OkMeta(result, page);

    return res.status(500).send({
        message: message,
        ...result,
        err: true,
        // Meta
    });
};
// let OkMeta = async (data, page) => {
//     const length = data.length;
//     return {
//         TotalItem: length,
//     }
// };


module.exports = { Ok, OkList, BadRequest, Forbidden, NotFound, Error };