/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('zkFismaIsso', {
		objFismaSystemId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'obj_fisma',
				key: 'Id'
			},
			field: 'objFismaSystem_Id'
		},
		objPocId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'obj_poc',
				key: 'Id'
			},
			field: 'objPOC_Id'
		}
	}, {
		tableName: 'zk_fisma_isso'
	});
};
