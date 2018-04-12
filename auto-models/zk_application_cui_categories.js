/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('zkApplicationCuiCategories', {
		objApplicationId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'obj_application',
				key: 'Id'
			},
			field: 'obj_application_Id'
		},
		objCuiCategoryId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'obj_cui_category',
				key: 'Id'
			},
			field: 'obj_cui_category_Id'
		}
	}, {
		tableName: 'zk_application_cui_categories'
	});
};
