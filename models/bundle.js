'use strict';
module.exports = (sequelize, DataTypes) => {
  const Bundle = sequelize.define('Bundle', {
    // id:DataTypes.STRING,
    style: DataTypes.STRING,
    color: DataTypes.STRING,
    size: DataTypes.STRING,
    qty: DataTypes.STRING,
    shelfId: DataTypes.STRING
  }, {});
  Bundle.associate = function(models) {
    // associations can be defined here
    Bundle.belongsTo(models.Shelf, {foreignKey: 'shelfId', as: 'shelf'})
  };
  return Bundle;
};