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
    reference_documents: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'Reference_documents'
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
    },
    obj508ComplianceStatusId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'obj_508_compliance_status',
        key: 'Id'
      },
      field: 'obj_508_compliance_status_Id'
    }
  }, {
    name: {
      singular: 'technology',
      plural: 'technologies',
    },
    timestamps: false,
    tableName: 'obj_technology'
  });
  technology.associate = function (models) {

    models.technology.belongsToMany(models.technologyreplacedby, {
      as: 'replaced_by',
      foreignKey: 'obj_technology_Id',
      otherKey: 'obj_replaced_by_technology_Id',
      through: 'zk_technology_replaced_by',
      timestamps: false,
    });
    models.technology.belongsToMany(models.standardCategory, {
      as: 'categories',
      foreignKey: 'obj_technology_Id',
      otherKey: 'obj_standard_category_Id',
      through: 'zk_technology_standard_category',
      timestamps: false,
    });
    models.technology.belongsToMany(models.poc, {
      as: 'pocs',
      foreignKey: 'obj_technology_Id',
      otherKey: 'obj_poc_Id',
      through: 'zk_technology_poc',
      timestamps: false,
    });
  }

  return technology;
};
