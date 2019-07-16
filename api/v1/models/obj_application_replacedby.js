/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
  var applicationreplacedby = sequelize.define('applicationreplacedby', {
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
      singular: 'applicationreplacedby',
      plural: 'applicationreplacedbys',
    },
    tableName: 'obj_application_replacedby',
    timestamps: false,
  });
  return applicationreplacedby
};
