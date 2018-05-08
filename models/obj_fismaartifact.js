/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	const TIMESTAMP = require('sequelize-mysql-timestamp')(sequelize);
	var fismaArtifact = sequelize.define('fismaArtifact', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'Id'
		},
		keyname: {
			type: DataTypes.STRING,
			allowNull: false,
			field: 'Keyname'
		},
		link: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Link'
		},
		createDtg: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW(),
			field: 'CreateDTG'
		},
		changeDtg: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW(),
			field: 'ChangeDTG'
		},
		createAudit: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'CreateAudit'
		},
		changeAudit: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'ChangeAudit'
		}
	},
	{
		timestamps: false,
		tableName: 'obj_fismaartifact',
		timestamps: false,
	});

	fismaArtifact.associate = function (models) {
		models.fismaArtifact.belongsToMany(models.fisma, {
			foreignKey: 'objFISMAartifact_Id',
			through: 'zk_fisma_artifact',
			timestamps: false,
		});
	}

	return fismaArtifact;
};
