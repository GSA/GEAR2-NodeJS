/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('zkTechnologyReplacedBy', {
		objTechnologyId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'obj_technology',
				key: 'Id'
			},
			field: 'obj_technology_Id'
		},
		objReplacedByTechnologyId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'obj_technology',
				key: 'Id'
			},
			field: 'obj_replaced_by_technology_Id'
		}
	}, {
		tableName: 'zk_technology_replaced_by'
	});
};
