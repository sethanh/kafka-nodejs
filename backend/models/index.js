
const Sequelize = require("sequelize");
let sequelize = require("./../config/databaseConn");

const users=require('./users')(sequelize, Sequelize);
const generaties = require('./generaties')(sequelize,Sequelize);
const products = require('./products')(sequelize,Sequelize);

const db = {};
db.Op = Sequelize.Op;

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = users;
db.generaties = generaties;
db.users = users;
db.products = products;

//associate
//users
// db.users.hasMany(db.loyaltys, {foreignKey: 'user_id'});
// db.users.hasMany(db.invoices, {foreignKey: 'user_id'});
//loyaltys
// db.loyaltys.belongsTo(db.users, {foreignKey: 'user_id'});
//invocie_details
//products
// db.products.hasMany(db.invoice_details, {foreignKey: 'product_id'})

module.exports = db;