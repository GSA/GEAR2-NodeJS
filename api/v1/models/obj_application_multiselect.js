module.exports = function (sequelize, DataTypes) {
    var applicationMultiSelect = sequelize.define('applicationMultiSelect', {
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
        }
    }, {
        name: {
            singular: 'appmultiselect',
            plural: 'appmultiselects'
        },
        timestamps: false,
        tableName: 'obj_application'
    });

    applicationMultiSelect.associate = (models) => {
        models.applicationMultiSelect.belongsToMany(models.organization, {
            as: 'organizations',
            foreignKey: 'obj_application_Id',
            otherKey: 'obj_org_owner_Id',
            through: 'zk_application_owning_org',
            timestamps: false
        });

        models.applicationMultiSelect.belongsToMany(models.userLocation, {
            as: 'userLocations',
            foreignKey: 'obj_application_Id',
            otherKey: 'obj_userloc_Id',
            through: 'zk_application_userloc',
            timestamps: false
        })
    };
    return applicationMultiSelect;
};