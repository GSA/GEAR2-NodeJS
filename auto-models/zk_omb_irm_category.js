/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('zkOmbIrmCategory', {
		objIrmCategoriesId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'obj_omb_irm_categories',
				key: 'Id'
			},
			field: 'obj_irm_categories_Id'
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
		tableName: 'zk_omb_irm_category'
	});
};
