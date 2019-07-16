/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
  var poc = sequelize.define('poc', {
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
      defaultValue: "Admin",
      field: 'CreateAudit'
    },
    changeAudit: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "Admin",
      field: 'ChangeAudit'
    },
  }, {
    name: {
      singular: 'poc',
      plural: 'pocs',
    },
    tableName: 'obj_poc',
    timestamps: false,
  });

  poc.associate = function (models) {
    models.poc.belongsToMany(models.application, {
      as: 'business_pocs',
      foreignKey: 'obj_application_Id',
      otherKey: 'obj_bus_poc_Id',
      through: 'zk_application_business_poc',
      timestamps: false,
    });
    models.poc.belongsToMany(models.application, {
      as: 'technical_pocs',
      foreignKey: 'obj_application_Id',
      otherKey: 'obj_tech_poc_Id',
      through: 'zk_application_technical_poc',
      timestamps: false,
    });
  //   models.poc.belongsToMany(models.fisma, {
  //     as: 'fisma_issm',
  //     foreignKey: 'objPOC_Id',
  //     otherKey: 'objFismaSystem_Id',
  //     through: 'zk_fisma_issm',
  //     timestamps: false,
  //   });
  //   models.poc.belongsToMany(models.fisma, {
  //     as: 'fisma_isso',
  //     foreignKey: 'objPOC_Id',
  //     otherKey: 'objPOC_Id',
  //     through: 'zk_fisma_isso',
  //     timestamps: false,
  //   });
  }

  return poc;
};
