let { sendOk, sendErr } = require('./../../components')
const db = require("../../models");
const { users } = db;

let verifySignUp = async (req, res) => {
  const { params, query } = req;
  const { id } = params;
  const { email } = query;

  let user = await users.findOne({ where: { email, code: id } });

  if (!user.is_verify) {
    var current_day = new Date().toISOString()
    user.update({
      ...user,
      is_verify: current_day
    })
  }

  res.send(`<html>
  <body style="width: 100vw; height: 100vh; background-color: #151515; color: #fff; display: flex; justify-content: center; align-items: center; text-align: center;flex-direction: column">
  <h2>${email} is verify in Wire Ico</h2>
  <h3>please click the button below to login and experience WIRE ICO</h3>
  <input type="button" onclick="location.href='http://20.213.90.182';" value="Sign in Wire Ico"  style="padding: 10px 20px; border-radius:10px ; border: none"/>
  </body>
  </html>`);
}



module.exports = { verifySignUp };