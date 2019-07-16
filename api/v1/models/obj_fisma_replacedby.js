/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
  var fismareplacedby = sequelize.define('fismareplacedby', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
	  primaryKey: true,
      field: 'Id'
    },
    keyname: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'Keyname'
    }
  }, {
    name: {
      singular: 'fismareplacedby',
      plural: 'fismareplacedbys',
    },
    tableName: 'obj_fisma_replacedby',
    timestamps: false,
  });
  return fismareplacedby
};
