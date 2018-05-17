/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
  var investmentCost = sequelize.define('investmentCost', {
    fy: {
      type: "YEAR(4)",
      allowNull: false,
      primaryKey: true,
      field: 'FY'
    },
    objInvestmentId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'obj_investment',
        key: 'Id'
      },
      field: 'obj_investment_Id'
    },
    dme: {
      type: DataTypes.FLOAT,
      allowNull: true,
      field: 'DME'
    },
    om: {
      type: DataTypes.FLOAT,
      allowNull: true,
      field: 'OM'
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: true,
      field: 'Total'
    },
    source: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'Source'
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
    tableName: 'obj_investment_cost'
  });
  return investmentCost;
};
