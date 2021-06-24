'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class vaccine_data extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  vaccine_data.init({
    city_name: DataTypes.STRING,
    doses: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'vaccine_data',
    tableName: 'vaccine_data',
    underscored:true,
  });
  return vaccine_data;
};