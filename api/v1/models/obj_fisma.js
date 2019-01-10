/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
  var fisma = sequelize.define('fisma', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'GEAR_ID'
    },
    keyname: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'System_Name'
    }
  }, {
    name: {
      singular: 'fisma',
      plural: 'fismas',
    },
    timestamps: false,
    tableName: 'obj_fisma_archer',
  });

  return fisma;
};
