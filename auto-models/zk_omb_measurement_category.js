/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('zkOmbMeasurementCategory', {
		objMeasurementCategoryId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'obj_omb_measurement_category',
				key: 'Id'
			},
			field: 'obj_measurement_category_Id'
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
		tableName: 'zk_omb_measurement_category'
	});
};
