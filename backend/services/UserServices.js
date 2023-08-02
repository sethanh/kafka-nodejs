const serviceName = 'users';
const db = require("../models");
base = db[serviceName];

var GetAll = async (filters) => {
    try {
        var result = await base.findAll({
            where: {
                ...filters
            }
        })
        return result;
    }

    catch (err) {
        var error = {
            QueryError: true,
            Message: JSON.stringify(err)
        }
        return error;
    }
}

var FirstOrDefault = async (filters) => {
    try {
        var result = await base.findOne({
            where: {
                ...filters
            }
        })
        return result;
    }
    catch (err) {
        var error = {
            QueryError: true,
            Message: JSON.stringify(err)
        }
        return error;
    }
}

var Add =  async (data) => {
    try {
        var result = await base.create({...data});
        return result;
    }
    catch (err) {
        var error = {
            QueryError: true,
            Message: JSON.stringify(err)
        }
        return error;
    }
}

let contentEmail = (host, code, email) => {

    const href = `${host}/verify/${code}/signup?email=${email}`;

    return `<div style="width: 500px; padding:60px 10px; background-color: #151515;">
    <div style="font-size:20px; color: #ffffff;">Wire Ico</div>
    <div style="color: #ffffff;">Dear ${email},</div>
    <div style="color: #ffffff;">Welcome to Wire Ico,</div>
    <div style="padding-bottom: 10px; color: #ffffff;">To authenticate and experience WIre Ico, please click the button below to go to the account verification page</div>
    <a rel="noopener" target="_blank" href="${href}" style="background-color: #1F7F4C; border-radius:10px; font-size: 18px; font-family: Helvetica, Arial, sans-serif; font-weight: bold; text-decoration: none; padding: 10px 30px; color: #ffffff; display: inline-block; mso-padding-alt: 0;cursor: pointer;">
        <span style="mso-text-raise: 15pt;">Verify</span>
    </a>
    <div style="padding-top: 10px;color: #ffffff;">thanks</div>
    <div style="color: #ffffff;">Wire Icon</div>
    <div style="color: #ffffff;">contact: wireIco@gmail.com</div>
    </div>
    `
};

module.exports = { contentEmail, GetAll, FirstOrDefault, Add };