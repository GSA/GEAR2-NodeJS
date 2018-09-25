/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
  var application = sequelize.define('application', {
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
    displayName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'Display_Name'
    },
    applicationAlias: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'Application_alias'
    },
    cloudIndicator: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'Cloud_Indicator'
    },
    mobileAppIndicator: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'Mobile_App_Indicator'
    },
    desktopIndicator: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'Desktop_Indicator',
      label: 'Desktop (Y/N)',
    },
    regionalClassification: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'Regional_Classification'
    },
    applicationOrWebsite: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Application",
      field: 'Application_or_Website'
    },
    numberOfUsers: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'Number_of_Users'
    },
    generateRevenueIndicator: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'Generate_Revenue_Indicator'
    },
    applicationNotes: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'Application_Notes'
    },
    objAppPlatformId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'obj_app_platform',
        key: 'Id'
      },
      field: 'obj_app_platform_Id'
    },
    objAppHostingproviderId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'obj_app_hostingprovider',
        key: 'Id'
      },
      field: 'obj_app_hostingprovider_Id'
    },
    tier: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'Tier'
    },
    productionYear: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'Production_Year'
    },
    retiredYear: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'Retired_Year'
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'URL'
    },
    timeNotes: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'TIME_Notes'
    },
    cuiIndicator: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'CUI_Indicator'
    },
    uniqueIdentifierCode: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "0233-0000-0000000-xxxx",
      field: 'Unique_Identifier_Code'
    },
    referenceDocument: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'Reference_Document'
    },
    objOrgSsoId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'obj_organization',
        key: 'Id'
      },
      field: 'obj_org_SSO_Id'
    },
    objParentSystemId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'obj_parent_system',
        key: 'Id'
      },
      field: 'obj_parent_system_Id'
    },
    objInvestmentId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'obj_investment',
        key: 'Id'
      },
      field: 'obj_investment_Id'
    },
    objPortfolioId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'obj_portfolio',
        key: 'Id'
      },
      field: 'obj_portfolio_Id'
    },
    objFismaId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'obj_fisma',
        key: 'Id'
      },
      field: 'obj_fisma_Id'
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
    objApplicationStatusId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'obj_application_status',
        key: 'Id'
      },
      field: 'obj_application_status_Id'
    },
  }, {
    indexes: [
      {
        unique: true,
        fields: ['id']
      }
    ],
    name: {
      singular: 'application',
      plural: 'applications',
    },
    timestamps: false,
    tableName: 'obj_application'
  });
  application.associate = function (models) {
    // first 2, 'replacedby', are n:m self-joins
    models.application.belongsToMany(models.applicationreplacedby, {
      as: 'replacedby',
      foreignKey: 'obj_application_Id',
      otherKey: 'obj_application_Id1',
      through: 'zk_application_replacedby',
      timestamps: false,
    });

    models.application.belongsToMany(models.capability, {
      as: 'capabilities',
      foreignKey: 'obj_application_Id',
      otherKey: 'obj_capability_Id',
      through: 'zk_app_capabilities',
      timestamps: false,
    });
    models.application.belongsToMany(models.organization, {
      as: 'users',
      foreignKey: 'obj_application_Id',
      otherKey: 'obj_org_user_Id',
      through: 'zk_application_users',
      timestamps: false,
    });
    models.application.belongsToMany(models.poc, {
      as: 'business_pocs',
      foreignKey: 'obj_application_Id',
      otherKey: 'obj_bus_poc_Id',
      through: 'zk_application_business_poc',
      timestamps: false,
    });
    models.application.belongsToMany(models.poc, {
      as: 'technical_pocs',
      foreignKey: 'obj_application_Id',
      otherKey: 'obj_tech_poc_Id',
      through: 'zk_application_technical_poc',
      timestamps: false,
    });
    models.application.belongsToMany(models.technology, {
      as: 'technologies',
      foreignKey: 'obj_application_Id',
      otherKey: 'obj_technology_Id',
      through: 'zk_application_technology',
      timestamps: false,
      onDelete: 'cascade',
      constraints: false,
    });
  };
  return application;
};
