/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
  var standardCategory = sequelize.define('standardCategory', {
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
    objStandardCategoryParentId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'obj_standard_category',
        key: 'Id'
      },
      field: 'obj_standard_category_Parent_Id'
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
      field: 'CreateAudit'
    },
    changeAudit: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'ChangeAudit'
    }
  }, {
    timestamps: false,
    tableName: 'obj_standard_category'
  });
  return standardCategory;
};
