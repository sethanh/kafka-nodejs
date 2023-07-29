'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invoices extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Invoices.init({
    created_by: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    invoice_code: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Invoices',
  });
  return Invoices;
};