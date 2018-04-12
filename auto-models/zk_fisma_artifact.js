/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('zkFismaArtifact', {
		objFismaSystemId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'obj_fisma',
				key: 'Id'
			},
			field: 'objFismaSystem_Id'
		},
		objFismAartifactId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'obj_fismaartifact',
				key: 'Id'
			},
			field: 'objFISMAartifact_Id'
		}
	}, {
		tableName: 'zk_fisma_artifact'
	});
};
