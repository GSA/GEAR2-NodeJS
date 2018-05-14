/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
  var investment = sequelize.define('investment', {
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
    comments: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'Comments'
    },
    active: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'Active'
    },
    budgetYear: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'Budget_Year'
    },
    uii: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'UII'
    },
    objInvestmentTypeId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'obj_investment_type',
        key: 'Id'
      },
      field: 'obj_investment_type_Id'
    },
    primaryServiceArea: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'obj_capability',
        key: 'Id'
      },
      field: 'primary_service_area'
    },
    secServArea1: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'obj_capability',
        key: 'Id'
      },
      field: 'sec_serv_area1'
    },
    secServArea2: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'obj_capability',
        key: 'Id'
      },
      field: 'sec_serv_area2'
    },
    secServArea3: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'obj_capability',
        key: 'Id'
      },
      field: 'sec_serv_area3'
    },
    secServArea4: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'obj_capability',
        key: 'Id'
      },
      field: 'sec_serv_area4'
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
    objPocId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'obj_poc',
        key: 'Id'
      },
      field: 'obj_poc_Id'
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
    tableName: 'obj_investment'
  });
  return investment;
};
