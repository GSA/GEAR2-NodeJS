/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('zkOmbSupportedGoals', {
		objSupportedGoalsId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'obj_omb_supported_goals',
				key: 'Id'
			},
			field: 'obj_supported_goals_Id'
		},
		objOmbAssetInvId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'obj_omb_asset_inv',
				key: 'Id'
			},
			field: 'obj_omb_asset_inv_Id'
		}
	}, {
		tableName: 'zk_omb_supported_goals'
	});
};
