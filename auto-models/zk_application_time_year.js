/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('zkApplicationTimeYear', {
		objApplicationId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'obj_application',
				key: 'Id'
			},
			field: 'obj_application_Id'
		},
		objYearId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'obj_year',
				key: 'Id'
			},
			field: 'obj_year_Id'
		}
	}, {
		tableName: 'zk_application_time_year'
	});
};
