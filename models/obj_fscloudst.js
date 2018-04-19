module.exports = function(sequelize, DataTypes) {
	var FSCloudST = sequelize.define('FSCloudST', {
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
	}, {
		timestamps: false,
		tableName: 'obj_fscloudst',
		timestamps: false,
	});

	return FSCloudST;
};
