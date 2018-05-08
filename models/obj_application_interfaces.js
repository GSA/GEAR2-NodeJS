/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	const TIMESTAMP = require('sequelize-mysql-timestamp')(sequelize);
	var applicationInterfaces = sequelize.define('applicationInterfaces', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'Id'
		},
		name: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Name'
		},
		createDtg: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW(),
			field: 'CreateDTG'
		},
		changeDtg: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW(),
			field: 'ChangeDTG'
		},
		createAudit: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'CreateAudit'
		},
		changeAudit: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'ChangeAudit'
		},
		objApplicationId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'obj_application',
				key: 'Id'
			},
			field: 'obj_application_Id'
		},
		objApplicationId1: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'obj_application',
				key: 'Id'
			},
			field: 'obj_application_Id1'
		}
	}, {
		timestamps: false,
		tableName: 'obj_application_interfaces'
	});
	return applicationInterfaces;
};
