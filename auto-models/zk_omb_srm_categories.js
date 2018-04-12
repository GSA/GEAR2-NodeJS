/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('zkOmbSrmCategories', {
		objSrmInfoId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'obj_omb_srm_info',
				key: 'Id'
			},
			field: 'obj_srm_info_Id'
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
		tableName: 'zk_omb_srm_categories'
	});
};
