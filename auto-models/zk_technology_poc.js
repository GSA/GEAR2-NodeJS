/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('zkTechnologyPoc', {
		objTechnologyId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'obj_technology',
				key: 'Id'
			},
			field: 'obj_technology_Id'
		},
		objPocId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'obj_poc',
				key: 'Id'
			},
			field: 'obj_poc_Id'
		}
	}, {
		tableName: 'zk_technology_poc'
	});
};
