/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('zkFismaTechnology', {
		objTechnologyId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'obj_technology',
				key: 'Id'
			},
			field: 'obj_technology_Id'
		},
		objFismaId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'obj_fisma',
				key: 'Id'
			},
			field: 'obj_fisma_Id'
		}
	}, {
		tableName: 'zk_fisma_technology'
	});
};
