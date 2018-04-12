/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	var objFisma = sequelize.define('objFisma', {
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

		// artifacts: {
		// 	type: DataTypes.INTEGER(11),
		// 	allowNull: true,
		// 	references: {
		// 		model: 'obj_fismaartifact',
		// 		key: 'Id'
		// 	},
		// 	field: 'obj_fismaartifact_Id'
		// },


		// objFscloudspId: {
		// 	type: DataTypes.INTEGER(11),
		// 	allowNull: true,
		// 	references: {
		// 		model: 'obj_fscloudsp',
		// 		key: 'Id'
		// 	},
		// 	field: 'obj_fscloudsp_Id'
		// },
		// objFscloudstId: {
		// 	type: DataTypes.INTEGER(11),
		// 	allowNull: true,
		// 	references: {
		// 		model: 'obj_fscloudst',
		// 		key: 'Id'
		// 	},
		// 	field: 'obj_fscloudst_Id'
		// },
		// objPocAoId: {
		// 	type: DataTypes.INTEGER(11),
		// 	allowNull: true,
		// 	references: {
		// 		model: 'obj_poc',
		// 		key: 'Id'
		// 	},
		// 	field: 'obj_poc_ao_Id'
		// },
		// objPocSoId: {
		// 	type: DataTypes.INTEGER(11),
		// 	allowNull: false,
		// 	references: {
		// 		model: 'obj_poc',
		// 		key: 'Id'
		// 	},
		// 	field: 'obj_poc_so_Id'
		// },
		// objAtotypeId: {
		// 	type: DataTypes.INTEGER(11),
		// 	allowNull: true,
		// 	references: {
		// 		model: 'obj_atotype',
		// 		key: 'Id'
		// 	},
		// 	field: 'obj_atotype_Id'
		// },
		// objOrganizationId: {
		// 	type: DataTypes.INTEGER(11),
		// 	allowNull: true,
		// 	references: {
		// 		model: 'obj_organization',
		// 		key: 'Id'
		// 	},
		// 	field: 'obj_organization_Id'
		// },
		// objScimpactlevelId: {
		// 	type: DataTypes.INTEGER(11),
		// 	allowNull: true,
		// 	references: {
		// 		model: 'obj_scimpactlevel',
		// 		key: 'Id'
		// 	},
		// 	field: 'obj_scimpactlevel_Id'
		// },
	}, {
		tableName: 'obj_fisma',
		timestamps: false,
	});

	return objFisma;
};
