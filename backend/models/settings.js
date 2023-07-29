'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Settings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Settings.init({
    comming_soon: DataTypes.BOOLEAN,
    signup_count_down: DataTypes.DATE,
    ico_count_down: DataTypes.DATE,
    final_lander_page: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Settings',
  });
  return Settings;
};