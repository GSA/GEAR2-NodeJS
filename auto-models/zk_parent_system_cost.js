/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('zkParentSystemCost', {
		objParentSystemId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'obj_parent_system',
				key: 'Id'
			},
			field: 'obj_parent_system_Id'
		},
		objInvestmentCostId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			field: 'obj_investment_cost_Id'
		}
	}, {
		tableName: 'zk_parent_system_cost'
	});
};
