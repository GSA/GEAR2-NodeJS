/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
  var technology = sequelize.define('technology', {
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
    approvedStatusExpirationDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'Approved_Status_Expiration_Date'
    },
    vendorStandardOrganization: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'Vendor_Standard_Organization'
    },
    availableThroughMyview: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'Available_through_Myview'
    },
    goldImage: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'Gold_Image'
    },
    goldImageComment: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'Gold_Image_Comment'
    },
    comments: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'Comments'
    },
    objTechnologyStatusId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: "1",
      references: {
        model: 'obj_technology_status',
        key: 'Id'
      },
      field: 'obj_technology_status_Id'
    },
    objDeploymentTypeId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'obj_deployment_type',
        key: 'Id'
      },
      field: 'obj_deployment_type_Id'
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
    objStandardTypeId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'obj_standard_type',
        key: 'Id'
      },
      field: 'obj_standard_type_Id'
    }
  }, {
    timestamps: false,
    tableName: 'obj_technology'
  });

  technology.associate = function (models) {
    models.technology.belongsToMany(models.fisma, { through: 'zk_fisma_technology' });
  }

  return technology;
};
