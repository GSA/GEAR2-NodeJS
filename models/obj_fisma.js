/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	const TIMESTAMP = require('sequelize-mysql-timestamp')(sequelize);
	var Fisma = sequelize.define('Fisma', {
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
		description: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'Description'
		},
		fismaSysId: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'FISMA_Sys_Id'
		},
		fedCtrLocated: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Fed_Ctr_Located'
		},
		atoDate: {
			type: DataTypes.DATE,
			allowNull: true,
			field: 'ATODate'
		},
		interimAto: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Interim_ATO'
		},
		atoRenewalDate: {
			type: DataTypes.DATE,
			allowNull: true,
			field: 'ATO_Renewal_Date'
		},
		inactiveDate: {
			type: DataTypes.DATE,
			allowNull: true,
			field: 'InactiveDate'
		},
		currentFyFismaAssessment: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'Current_FY_FISMA_Assessment'
		},
		pii: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'PII'
		},
		cloudHosted: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'CloudHosted'
		},
		comments: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'Comments'
		},
		fscloudstId: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'obj_fscloudst_Id'
		},
	},
	{
		timestamps: false,
		tableName: 'obj_fisma',
	});

	Fisma.associate = function (models) {
		models.Fisma.belongsToMany(models.Artifact, { through: 'j_fisma_artifacts' });
	}

	return Fisma;
};
