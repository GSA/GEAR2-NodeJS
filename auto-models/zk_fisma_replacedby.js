/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('zkFismaReplacedby', {
		objFismaSystemIdOld: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'obj_fisma',
				key: 'Id'
			},
			field: 'objFismaSystem_Id_Old'
		},
		objFismaSystemIdNew: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'obj_fisma',
				key: 'Id'
			},
			field: 'objFismaSystem_Id_New'
		}
	}, {
		tableName: 'zk_fisma_replacedby'
	});
};
