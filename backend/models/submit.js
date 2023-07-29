'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Submit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Submit.init({
    name: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    time: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Submit',
  });
  return Submit;
};