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
    name: {
      singular: 'technology',
      plural: 'technologies',
    },
    timestamps: false,
    tableName: 'obj_technology'
  });

  technology.associate = function (models) {
    models.technology.belongsToMany(models.application, {
      as: 'applications',
      foreignKey: 'obj_technology_Id',
      otherKey: 'obj_application_Id',
      through: 'zk_application_technology',
      timestamps: false,
    });
    models.technology.belongsToMany(models.technology, {
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
    models.technology.belongsToMany(models.referenceDocument, {
      as: 'reference_documents',
      foreignKey: 'obj_technology_Id',
      otherKey: 'obj_reference_documents_Id',
      through: 'zk_technology_reference_documents',
      timestamps: false,
    });
  }

  return technology;
};
