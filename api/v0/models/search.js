const Model = require('./model');

class SearchModel extends Model {
    constructor (f) {
        super (f);
        this.fields = [
            {
                name: 'Id',
                type: 'string',
                mapping (data) {
                    return data.Id
                }
            },
            {
                name: 'Keyname',
                type: 'string',
                mapping(data) {
                    console.log('wow', data);
                    return data.Keyname;
                }
            },
            {
                name: 'Description',
                type: 'string',
                mapping (data) {
                    return data.Description;
                }
            },
            {
                name: 'GEAR_Type',
                type: 'string',
                mapping (data) {
                    return data.GEAR_Type;
                }
            },
            {
                name: 'Other',
                type: 'string',
                mapping (data) {
                    return data.Other;
                }
            }
        ];
    }
}

module.exports = SearchModel;