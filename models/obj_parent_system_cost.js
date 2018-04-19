/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	var objParentSystemCost = sequelize.define('objParentSystemCost', {
		fy: {
			type: "YEAR(4)",
			allowNull: false,
			primaryKey: true,
			field: 'FY'
		},
		objParentSystemId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'obj_parent_system',
				key: 'Id'
			},
			field: 'obj_parent_system_Id'
		},
		dme: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'DME'
		},
		om: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'OM'
		},
		total: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'Total'
		},
		source: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Source'
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
			field: 'CreateAudit'
		},
		changeAudit: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'ChangeAudit'
		}
	}, {
		timestamps: false,
		tableName: 'obj_parent_system_cost'
	});
	return objParentSystemCost;
};
