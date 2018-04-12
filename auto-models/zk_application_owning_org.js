/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('zkApplicationOwningOrg', {
		objApplicationId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'obj_application',
				key: 'Id'
			},
			field: 'obj_application_Id'
		},
		objOrgOwnerId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'obj_organization',
				key: 'Id'
			},
			field: 'obj_org_owner_Id'
		}
	}, {
		tableName: 'zk_application_owning_org'
	});
};
