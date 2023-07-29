'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Roadmap_details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Roadmap_details.init({
    name: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    code: DataTypes.INTEGER,
    road_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Roadmap_details',
  });
  return Roadmap_details;
};