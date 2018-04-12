/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('zkApplicationBusinessCapabilities', {
		objApplicationId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'obj_application',
				key: 'Id'
			},
			field: 'obj_application_Id'
		},
		objCapabilityId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'obj_capability',
				key: 'Id'
			},
			field: 'obj_capability_Id'
		}
	}, {
		tableName: 'zk_application_business_capabilities'
	});
};
