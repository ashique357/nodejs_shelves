'use strict';
module.exports = (sequelize, DataTypes) => {
  const Shelf = sequelize.define('Shelf', {
    // id: DataTypes.STRING,
    shelfName: DataTypes.STRING
  }, {});
  Shelf.associate = function(models) {
    // associations can be defined here
    Shelf.hasMany(models.Bundle, {as: 'bundles'})
  };
  return Shelf;
};