/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('objPoc', {
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
			type: DataTypes.TIME,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			field: 'CreateDTG'
		},
		changeDtg: {
			type: DataTypes.TIME,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			field: 'ChangeDTG'
		},
		createAudit: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: "Admin",
			field: 'CreateAudit'
		},
		changeAudit: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: "Admin",
			field: 'ChangeAudit'
		}
	}, {
		tableName: 'obj_poc'
	});
};
