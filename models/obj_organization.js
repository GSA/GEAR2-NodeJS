/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
  var organization = sequelize.define('organization', {
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
    link: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'Link'
    },
    parentId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'obj_organization',
        key: 'Id'
      },
      field: 'Parent_Id'
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
      singular: 'organization',
      plural: 'organizations',
    },
    timestamps: false,
    tableName: 'obj_organization'
  });
  return organization;
};
