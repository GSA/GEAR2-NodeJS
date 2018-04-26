/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	const TIMESTAMP = require('sequelize-mysql-timestamp')(sequelize);
	var poc = sequelize.define('poc', {
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
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			field: 'Email'
		},
		phNum: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'PhNum'
		},
		risso: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'RISSO'
		},
		createDtg: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: TIMESTAMP,
			field: 'CreateDTG'
		},
		changeDtg: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: TIMESTAMP,
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
		},
	}, {
		timestamps: false,
		tableName: 'obj_poc',
		timestamps: false,
	});

	poc.associate = function (models) {
		models.poc.belongsToMany(models.fisma, { through: 'zk_fisma_poc' });
	}

	return poc;
};
