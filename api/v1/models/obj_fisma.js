/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
  var fisma = sequelize.define('fisma', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'ex:GEAR_ID'
    },
    keyname: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'ex:System_Name'
    },
  }, {
    name: {
      singular: 'fisma',
      plural: 'fismas',
    },
    timestamps: false,
    tableName: 'obj_fisma_archer',
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
