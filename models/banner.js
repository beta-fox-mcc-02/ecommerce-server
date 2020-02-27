'use strict';
module.exports = (sequelize, DataTypes) => {
  const Banner = sequelize.define('Banner', {
    bannerUrl: DataTypes.STRING
  }, {});
  Banner.associate = function(models) {
    // associations can be defined here
  };
  return Banner;
};