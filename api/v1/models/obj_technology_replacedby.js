/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
  var technologyreplacedby = sequelize.define('technologyreplacedby', {
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
      singular: 'technologyreplacedby',
      plural: 'technologyreplacedbys',
    },
    tableName: 'obj_technology_replacedby',
    timestamps: false,
  });
  return technologyreplacedby
};
