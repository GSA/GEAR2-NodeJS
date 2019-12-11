/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
  var parentSystem = sequelize.define('parentSystem', {
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
    url: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'URL'
    },
    objOrganizationId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'obj_organization',
        key: 'Id'
      },
      field: 'obj_organization_Id'
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
      singular: 'parent_system',
      plural: 'parent_systems',
    },
    timestamps: false,
    tableName: 'obj_parent_system'
  });
  return parentSystem;
};
