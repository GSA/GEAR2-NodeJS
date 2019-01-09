
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('applicationGeneral', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'Id'
        },
        applicationAlias: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: 'Application_alias'
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
        objApplicationStatusId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'obj_application_status',
                key: 'Id'
            },
            field: 'obj_application_status_Id'
        },
        pplicationOrWebsite: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "Application",
            field: 'Application_or_Website'
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
        applicationOrWebsite: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "Application",
            field: 'Application_or_Website'
        },
    }, {
        indexes: [
            {
                unique: true,
                fields: ['id']
            }
        ],
        name: {
            singular: 'appGeneral',
            plural: 'appsGeneral'
        },
        timestamps: false,
        tableName: 'obj_application'
    });
};