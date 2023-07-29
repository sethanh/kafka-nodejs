let Sequelize = require("sequelize");

let sequelize = new Sequelize(process.env.database, process.env.user, process.env.password, {
  host: process.env.host,
  dialect: process.env.dialect,
});
module.exports = sequelize;