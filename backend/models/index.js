
const Sequelize = require("sequelize");
let sequelize = require("./../config/databaseConn");

const users=require('./users')(sequelize, Sequelize);
const loyaltys = require('./loyaltys')(sequelize, Sequelize);
const settings = require('./settings')(sequelize, Sequelize);
const generaties = require('./generaties')(sequelize,Sequelize);
const social_settings = require('./social_settings')(sequelize,Sequelize);
const roadmaps = require('./roadmaps')(sequelize,Sequelize);
const roadmaps_details = require('./roadmap_details')(sequelize,Sequelize);
const submits = require('./submit')(sequelize,Sequelize);
const products = require('./products')(sequelize,Sequelize);
const invoices = require('./invoices')(sequelize,Sequelize);
const invoice_details = require('./invoicedetails')(sequelize,Sequelize);
const db = {};
db.Op = Sequelize.Op;

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = users;
db.loyaltys = loyaltys;
db.settings = settings;
db.generaties = generaties;
db.social_settings= social_settings;
db.roadmaps = roadmaps;
db.roadmaps_details = roadmaps_details;
db.users = users;
db.submits = submits;
db.products = products;
db.invoices = invoices;
db.invoice_details = invoice_details;

//associate
//users
db.users.hasMany(db.loyaltys, {foreignKey: 'user_id'});
db.users.hasMany(db.invoices, {foreignKey: 'user_id'});
//loyaltys
db.loyaltys.belongsTo(db.users, {foreignKey: 'user_id'});
//roadmaps
db.roadmaps.hasMany(db.roadmaps_details, {foreignKey: 'road_id'});
//roadmap_details
db.roadmaps_details.belongsTo(db.roadmaps, {foreignKey: 'road_id'});
//invoices
db.invoices.belongsTo(db.users, {foreignKey: 'user_id'});
db.invoices.hasMany(db.invoice_details, {foreignKey: 'invoice_id'});
//invocie_details
db.invoice_details.belongsTo(db.invoices, {foreignKey: 'invoice_id'});
db.invoice_details.belongsTo(db.products, {foreignKey: 'product_id'});
//products
db.products.hasMany(db.invoice_details, {foreignKey: 'product_id'})

module.exports = db;