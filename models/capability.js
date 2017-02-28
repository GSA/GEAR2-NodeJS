/* jshint node:true, esnext: true */
var _ = require('underscore');

function Capability() {
    this.fields = [
        {
            name: 'Id',
            type: 'string',
            mapping: function (data) {
                return data.CapID;
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
            name: 'Description',
            type: 'string',
            mapping: function (data) {
                return data.Description;
            }
        },
        {
            name: 'Ref',
            type: 'string',
            mapping: function (data) {
                return data.Ref;
            }
        }
    ];
};

Capability.prototype.apply = function (cols) {
    var obj = {};
    this.fields.forEach(function (field) {
        obj[field.name] = field.mapping.call(field.mapping, cols)
    });
    return obj;
};

module.exports = Capability;
