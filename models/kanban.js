'use strict';
module.exports = (sequelize, DataTypes) => {
  const Kanban = sequelize.define('Kanban', {
    bundleID: DataTypes.STRING,
    status: DataTypes.STRING
  }, {});
  Kanban.associate = function(models) {
    // associations can be defined here
    Kanban.belongsTo(models.Bundle, {foreignKey: 'bundleID', as: 'bundle'});
  };
  return Kanban;
};