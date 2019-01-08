module.exports = function (sequelize, DataTypes) {
    var applicationTechnology = sequelize.define('applicationTechnology', {
        id: {
            type: DataTypes.INTEGER(11),
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                field: 'Id'
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
        objFismaId: {
            type: DataTypes.INTEGER(11),
            allowNull: true,
            references: {
                model: 'obj_fisma',
                key: 'Id'
            },
            field: 'obj_fisma_Id'
        },
    }, {
        indexes: [
            {
                unique: true,
                fields: ['id']
            }
        ],
        name: {
            singular: 'appTechnology',
            plural: 'appsTechnology',
        },
        timestamps: false,
        tableName: 'obj_application'
    });

    applicationTechnology.associate = function (models) {
        models.applicationTechnology.belongsToMany(models.poc, {
            as: 'technical_pocs',
            foreignKey: 'obj_application_Id',
            otherKey: 'obj_tech_poc_Id',
            through: 'zk_application_technical_poc',
            timestamps: false,
        });
        models.applicationTechnology.belongsToMany(models.technology, {
            as: 'technologies',
            foreignKey: 'obj_application_Id',
            otherKey: 'obj_technology_Id',
            through: 'zk_application_technology',
            timestamps: false,
            onDelete: 'cascade',
            constraints: false,
        });
    };
    return applicationTechnology;
}