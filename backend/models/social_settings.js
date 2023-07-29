'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Social_settings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Social_settings.init({
    name: DataTypes.STRING,
    link: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    image_code: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Social_settings',
  });
  return Social_settings;
};