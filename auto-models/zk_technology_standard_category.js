/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('zkTechnologyStandardCategory', {
		objStandardCategoryId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'obj_standard_category',
				key: 'Id'
			},
			field: 'obj_standard_category_Id'
		},
		objTechnologyId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'obj_technology',
				key: 'Id'
			},
			field: 'obj_technology_Id'
		}
	}, {
		tableName: 'zk_technology_standard_category'
	});
};
