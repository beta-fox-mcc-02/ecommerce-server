'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model 
  class Banner extends Model{
    static associate(models){

    }
  }
  Banner.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    jadwal: DataTypes.DATE
  }, {
    sequelize
  });
  return Banner;
};