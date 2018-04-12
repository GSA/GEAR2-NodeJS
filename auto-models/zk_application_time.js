/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('zkApplicationTime', {
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
		objFyId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'obj_fy',
				key: 'Id'
			},
			field: 'obj_fy_Id'
		},
		objTimeQuadrantId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'obj_time_quadrant',
				key: 'Id'
			},
			field: 'obj_time_quadrant_Id'
		}
	}, {
		tableName: 'zk_application_time'
	});
};
