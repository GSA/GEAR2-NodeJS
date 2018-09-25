/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
  var applicationInterface = sequelize.define('applicationInterface', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'Id'
    },
    keyname: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'Keyname'
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
    },
    objApplicationId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'obj_application',
        key: 'Id'
      },
      field: 'obj_application_Id'
    },
    objApplicationId1: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'obj_application',
        key: 'Id'
      },
      field: 'obj_application_Id1'
    }
  }, {
    name: {
      singular: 'application_interface',
      plural: 'application_interfaces',
    },
    timestamps: false,
    tableName: 'obj_application_interfaces'
  });
  applicationInterface.associate = function (models) {
    models.applicationInterface.belongsToMany(models.piiCategory, {
      as: 'piis',
      foreignKey: 'obj_application_interfaces_Id',
      otherKey: 'obj_pii_category_Id',
      through: 'zk_app_interfaces_pii',
      timestamps: false,
    });
    models.applicationInterface.belongsTo(models.application, {
      as: 'application_interfaces',
      foreignKey: 'obj_application_Id',
      timestamps: false,
    });
  }
  return applicationInterface;
};
