/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('zkApplicationTechnicalPoc', {
		objTechPocId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'obj_poc',
				key: 'Id'
			},
			field: 'obj_tech_poc_Id'
		},
		objApplicationId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'obj_application',
				key: 'Id'
			},
			field: 'obj_application_Id'
		}
	}, {
		tableName: 'zk_application_technical_poc'
	});
};
