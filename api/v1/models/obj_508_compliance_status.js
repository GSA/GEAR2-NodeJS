/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
  var complianceStatus = sequelize.define('complianceStatus', {
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
      field: 'CreateAudit'
    },
    changeAudit: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'ChangeAudit'
    }
  }, {
    name: {
      singular: 'compliance_status',
      plural: 'compliance_statuses',
    },
    timestamps: false,
    tableName: 'obj_508_compliance_status'
  });
  return complianceStatus;
};
