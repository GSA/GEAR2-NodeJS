/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('zkApplicationUsers', {
		objApplicationId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'obj_application',
				key: 'Id'
			},
			field: 'obj_application_Id'
		},
		objOrgUserId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'obj_organization',
				key: 'Id'
			},
			field: 'obj_org_user_Id'
		}
	}, {
		tableName: 'zk_application_users'
	});
};
