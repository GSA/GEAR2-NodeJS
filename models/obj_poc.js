/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	const TIMESTAMP = require('sequelize-mysql-timestamp')(sequelize);
	var Poc = sequelize.define('Poc', {
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
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			field: 'Email'
		},
		phNum: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'PhNum'
		},
		risso: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'RISSO'
		},
	}, {
		timestamps: false,
		tableName: 'obj_poc',
		timestamps: false,
	});

	Poc.associate = function (models) {
		models.Poc.belongsToMany(models.Fisma, { through: 'j_fisma_poc' });
	}

	return Poc;
};
