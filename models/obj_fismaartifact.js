/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	const TIMESTAMP = require('sequelize-mysql-timestamp')(sequelize);
	var Artifact = sequelize.define('Artifact', {
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
	},
	{
		timestamps: false,
		tableName: 'obj_fismaartifact',
		timestamps: false,
	});

	Artifact.associate = function (models) {
		models.Artifact.belongsToMany(models.Fisma, { through: 'j_fisma_artifacts' });
	}

	return Artifact;
};
