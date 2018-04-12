/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('zkOmbDataTopics', {
		objDataTopicsId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'obj_omb_data_topics',
				key: 'Id'
			},
			field: 'obj_data_topics_Id'
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
		tableName: 'zk_omb_data_topics'
	});
};
