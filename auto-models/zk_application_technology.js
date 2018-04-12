/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('zkApplicationTechnology', {
		objTechnologyId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'obj_technology',
				key: 'Id'
			},
			field: 'obj_technology_Id'
		},
		objApplicationId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'obj_application',
				key: 'Id'
			},
			field: 'obj_application_Id'
		}
	}, {
		tableName: 'zk_application_technology'
	});
};
