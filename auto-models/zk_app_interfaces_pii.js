/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('zkAppInterfacesPii', {
		objApplicationInterfacesId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'obj_application_interfaces',
				key: 'Id'
			},
			field: 'obj_application_interfaces_Id'
		},
		objPiiCategoryId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'obj_pii_category',
				key: 'Id'
			},
			field: 'obj_pii_category_Id'
		}
	}, {
		tableName: 'zk_app_interfaces_pii'
	});
};
