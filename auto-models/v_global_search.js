/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('vGlobalSearch', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: "0",
			field: 'Id'
		},
		keyname: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: "",
			field: 'Keyname'
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'Description'
		},
		gearType: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: "",
			field: 'GEAR_Type'
		},
		other: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'Other'
		}
	}, {
		tableName: 'v_global_search'
	});
};
