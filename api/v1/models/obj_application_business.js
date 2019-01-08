module.exports = function (sequelize, DataTypes) {
    var applicationBusiness = sequelize.define('applicationBusiness', {
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
        objOrgSsoId: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            references: {
                model: 'obj_organization',
                key: 'Id'
            },
            field: 'obj_org_SSO_Id'
        },
        productionYear: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'Production_Year'
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
        numberOfUsers: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'Number_of_Users'
        },
        regionalClassification: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'Regional_Classification'
        },
        generateRevenueIndicator: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'Generate_Revenue_Indicator'
        },
        tier: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'Tier'
        },
        url: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: 'URL'
        },
        cuiIndicator: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'CUI_Indicator'
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
        referenceDocument: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: 'Reference_Document'
        },
        applicationNotes: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: 'Application_Notes'
        },
    }, {
        name: {
            singular: 'appBusiness',
            plural: 'appsBusiness'
        },
        timestamps: false,
        tableName: 'obj_application'
    });

    applicationBusiness.associate = (models) => {
        models.applicationBusiness.belongsToMany(models.organization, {
            as: 'organizations',
            foreignKey: 'obj_application_Id',
            otherKey: 'obj_org_owner_Id',
            through: 'zk_application_owning_org',
            timestamps: false
        });

        models.applicationBusiness.belongsToMany(models.userLocation, {
            as: 'userLocations',
            foreignKey: 'obj_application_Id',
            otherKey: 'obj_userloc_Id',
            through: 'zk_application_userloc',
            timestamps: false
        });

        models.applicationBusiness.belongsToMany(models.poc, {
            as: 'business_pocs',
            foreignKey: 'obj_application_Id',
            otherKey: 'obj_bus_poc_Id',
            through: 'zk_application_business_poc',
            timestamps: false,
        });

        models.applicationBusiness.belongsToMany(models.capability, {
            as: 'capabilities',
            foreignKey: 'obj_application_Id',
            otherKey: 'obj_capability_Id',
            through: 'zk_app_capabilities',
            timestamps: false,
        });

        models.applicationBusiness.belongsToMany(models.organization, {
            as: 'users',
            foreignKey: 'obj_application_Id',
            otherKey: 'obj_org_user_Id',
            through: 'zk_application_users',
            timestamps: false,
        });
    };
    return applicationBusiness;
};