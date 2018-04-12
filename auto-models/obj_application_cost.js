/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('objApplicationCost', {
		objApplicationId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'obj_application',
				key: 'Id'
			},
			field: 'obj_application_Id'
		},
		fy: {
			type: "YEAR(4)",
			allowNull: false,
			primaryKey: true,
			field: 'FY'
		},
		dme: {
			type: DataTypes.FLOAT,
			allowNull: true,
			field: 'DME'
		},
		om: {
			type: DataTypes.FLOAT,
			allowNull: true,
			field: 'OM'
		},
		total: {
			type: DataTypes.FLOAT,
			allowNull: true,
			field: 'Total'
		},
		source: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'Source'
		},
		comment: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'Comment'
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
		tableName: 'obj_application_cost'
	});
};
