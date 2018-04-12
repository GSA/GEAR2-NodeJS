/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('zkTechnologyReferenceDocuments', {
		objReferenceDocumentsId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'obj_reference_documents',
				key: 'Id'
			},
			field: 'obj_reference_documents_Id'
		},
		objTechnologyId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'obj_technology',
				key: 'Id'
			},
			field: 'obj_technology_Id'
		}
	}, {
		tableName: 'zk_technology_reference_documents'
	});
};
