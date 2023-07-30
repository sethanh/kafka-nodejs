let { sendOk, sendErr } = require('./../components')
const db = require("../models");
const { invoices, invoice_details, generaties, products } = db;

let index = async (req, res) => {
    try {
        var data = await invoices.findAll({
            include: [
                {
                    model: invoice_details,
                    include: [
                        {
                            model: products,
                        }
                    ]
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

let show = async (req, res, next) => {
    const { params } = req;
    const { id } = params;

    try {
        var data = await invoices.findAll({
            where: {
                user_id: id
            },
            include: [
                {
                    model: invoice_details,
                    include: [
                        {
                            model: products,
                        }
                    ]
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
};

let destroy = async (req, res, next) => {
    const { params } = req;
    const { id } = params;
};

let create = async (req, res, next) => {
    const { user, ...body } = req.body;

    var number = await generaties.findOne({ where: { head: "INVOICE" } });
    var newcode = `MAHD${number.code + 1}`;
    number.update(
        {
            ...number,
            code: number.code + 1
        }
    );

    const { user_id, invoiceDetails } = body;
    var invoicedetails = invoiceDetails.length;

    var invocie = await invoices.create({ user_id : user_id,invoice_code: newcode });

    for (let index = 0; index < invoicedetails; index++) {
        await invoice_details.create({ ...invoiceDetails[index], invoice_id : invocie.id });
    }

    var data = await invoices.findAll({
        where: { id : invocie.id },
        include: [
            {
                model: invoice_details,
                include: [
                    {
                        model: products,
                    }
                ]
            }
        ]
    })

    // return sendOk({
    //     res,
    //     status: 200,
    //     message: 'Tạo hoá đơn thành công',
    //     data: data,
    //     error: false
    // });
    req.resData = data;
    next()
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