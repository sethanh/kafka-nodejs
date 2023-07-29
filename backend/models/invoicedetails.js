'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InvoiceDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  InvoiceDetails.init({
    created_by: DataTypes.STRING,
    product_id: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    invoice_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'InvoiceDetails',
  });
  return InvoiceDetails;
};