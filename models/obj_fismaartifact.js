/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('objFismaartifact', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'Id'
		},
		keyname: {
			type: DataTypes.STRING,
			allowNull: false,
			field: 'Keyname'
		},
		link: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Link'
		},
	},
	{
		tableName: 'obj_fismaartifact',
		timestamps: false,
	});
};
