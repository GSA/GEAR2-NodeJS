/* jshint node:true, esnext: true */
var _ = require('underscore');

function POC() {
    this.fields = [
        {
            name: 'Id',
            type: 'string',
            mapping: function (data) {
                return data.ObjID;
            }
        },
        {
            name: 'Name',
            type: 'string',
            mapping: function (data) {
                return data.Name;
            }
        },
        {
            name: 'Email',
            type: 'string',
            mapping: function (data) {
                return data.Email;
            }
        },
        {
            name: 'Type',
            type: 'string',
            mapping: function (data) {
                return data['POC Type'];
            }
        }
    ];
};

POC.prototype.apply = function (cols) {
    var obj = {};
    this.fields.forEach(function (field) {
        obj[field.name] = field.mapping.call(field.mapping, cols)
    });
    return obj;
};

module.exports = POC;
