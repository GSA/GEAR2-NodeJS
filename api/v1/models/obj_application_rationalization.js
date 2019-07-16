/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
  var applicationRationalization = sequelize.define('applicationRationalization', {
    objApplicationId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'obj_application',
        key: 'Id'
      },
      field: 'obj_application_Id'
    },
    fy: {
      type: "YEAR(4)",
      allowNull: false,
      primaryKey: true,
      field: 'FY'
    },
    timeVal: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'TIME_Val'
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'Comment'
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
  keyname: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'Keyname'
    },
  id: {
      type: DataTypes.INTEGER(11),
      field: 'Id'
    }
  }, {
    name: {
      singular: 'application_rationalization',
      plural: 'application_rationalizations',
    },
    timestamps: false,
    tableName: 'obj_application_rationalization'
  });
  applicationRationalization.associate = function (models) {
    models.applicationRationalization.belongsTo(models.application, {
      as: 'application_rationalizations',
      foreignKey: 'obj_application_Id',
      timestamps: false,
    });
  }
  return applicationRationalization;
};
