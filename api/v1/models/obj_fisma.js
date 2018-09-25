/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
  var fisma = sequelize.define('fisma', {
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
    authorizingOfficialId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
	  references: {
        model: 'obj_poc',
        key: 'Id'
      },
      field: 'obj_poc_ao_Id'
    },
    systemOwnerId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
	  references: {
        model: 'obj_poc',
        key: 'Id'
      },
      field: 'obj_poc_so_Id'
    },
    fscloudstId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'obj_fscloudst_Id'
    },
    fscloudspId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'obj_fscloudst_Id'
    },
    atoTypeId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'obj_atotype_Id'
    },
    ssoId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'obj_organization',
        key: 'Id'
      },
      field: 'obj_organization_Id'
    },
    scImpactLevelId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      field: 'obj_scimpactlevel_Id'
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
  }, {
    name: {
      singular: 'fisma',
      plural: 'fismas',
    },
    timestamps: false,
    tableName: 'obj_fisma',
  });

  fisma.associate = function (models) {
    models.fisma.belongsToMany(models.fismaArtifact, {
      as: 'fisma_artifacts',
      foreignKey: 'objFismaSystem_Id',
      otherKey: 'objFISMAartifact_Id',
      through: 'zk_fisma_artifact',
      timestamps: false,
    });
    models.fisma.belongsToMany(models.poc, {
      as: 'issm',
      foreignKey: 'objFismaSystem_Id',
      otherKey: 'objPOC_Id',
      through: 'zk_fisma_issm',
      timestamps: false,
    });
    models.fisma.belongsToMany(models.poc, {
      as: 'isso',
      foreignKey: 'objFismaSystem_Id',
      otherKey: 'objPOC_Id',
      through: 'zk_fisma_isso',
      timestamps: false,
    });
    models.fisma.belongsToMany(models.fismareplacedby, {
      as: 'replaced_by',
      foreignKey: 'objFismaSystem_Id_Old',
      otherKey: 'objFismaSystem_Id_New',
      through: 'zk_fisma_replacedby',
      timestamps: false,
    });
  }

  return fisma;
};
