/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	const TIMESTAMP = require('sequelize-mysql-timestamp')(sequelize);
	var capability = sequelize.define('capability', {
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
		description: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'Description'
		},
		referenceNumber: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'ReferenceNumber'
		},
		parentId: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			references: {
				model: 'obj_capability',
				key: 'Id'
			},
			field: 'Parent_Id'
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
			defaultValue: "Admin",
			field: 'CreateAudit'
		},
		changeAudit: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: "Admin",
			field: 'ChangeAudit'
		}
	}, {
		timestamps: false,
		tableName: 'obj_capability'
	});
	return capability;
};
