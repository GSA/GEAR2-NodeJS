/* jshint node:true, esnext: true */
var _ = require('underscore');

function Application() {
    this.fields = [
        {
            name: 'Alias',
            type: 'string',
            mapping: function (data) {
                return data.Aliases;
            }
        },
        // {
        //     name: 'AppInterfaces',
        //     type: 'string',
        //     mapping: function (data) {
        //         return data[];
        //     }
        // },
        {
            name: 'ApplicationType',
            type: 'string',
            mapping: function (data) {
                return data['Application Type'];
            }
        },
        {
            name: 'BusinessPOC',
            type: 'string',
            mapping: function (data) {
                return data['Business POC'];
            }
        },
        {
            name: 'Cloud',
            type: 'string',
            mapping: function (data) {
                return data.Cloud;
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
            name: 'DesktopComponent',
            type: 'string',
            mapping: function (data) {
                return data['Desktop Component'];
            }
        },
        // {
        //     name: 'DetBusinessPOC',
        //     type: 'string',
        //     mapping: function (data) {
        //         return data[];
        //     }
        // },
        // {
        //     name: 'DetTechnicalPOC',
        //     type: 'string',
        //     mapping: function (data) {
        //         return data[];
        //     }
        // },
        // {
        //     name: 'FismaName',
        //     type: 'string',
        //     mapping: function (data) {
        //         return data[];
        //     }
        // },
        {
            name: 'HostingProvider',
            type: 'string',
            mapping: function (data) {
                return data['Hosting Provider'];
            }
        },
        {
            name: 'Id',
            type: 'string',
            mapping: function (data) {
                return data.ID;
            }
        },
        {
            name: 'Investment',
            type: 'string',
            mapping: function (data) {
                return data.Investment;
            }
        },
        {
            name: 'IsRevenueGenerator',
            type: 'string',
            mapping: function (data) {
                return data.Revenue;
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
            name: 'Owner',
            type: 'string',
            mapping: function (data) {
                return data['Owning Org'];
            }
        },
        {
            name: 'RegionClassification',
            type: 'string',
            mapping: function (data) {
                return data['Region Classification'];
            }
        },
        {
            name: 'RelCapabilities',
            type: '$ref',
            mapping: function (data) {
                return 'capabilities';
            }
        },
        // {
        //     name: 'RelFISMASys',
        //     type: 'string',
        //     mapping: function (data) {
        //         return data[];
        //     }
        // },
        // {
        //     name: 'RelStandards',
        //     type: 'string',
        //     mapping: function (data) {
        //         return data[];
        //     }
        // },
        // {
        //     name: 'RetiredYear',
        //     type: 'string',
        //     mapping: function (data) {
        //         return data[];
        //     }
        // },
        {
            name: 'SSO',
            type: 'string',
            mapping: function (data) {
                return data.SSO;
            }
        },
        // {
        //     name: 'SSO_Display_Name',
        //     type: 'string',
        //     mapping: function (data) {
        //         return data[];
        //     }
        // },
        // {
        //     name: 'SSO_ID',
        //     type: 'string',
        //     mapping: function (data) {
        //         return data[];
        //     }
        // },
        // {
        //     name: 'SSO_Name',
        //     type: 'string',
        //     mapping: function (data) {
        //         return data[];
        //     }
        // },
        {
            name: 'Status',
            type: 'string',
            mapping: function (data) {
                return data.Status;
            }
        },
        {
            name: 'System',
            type: 'string',
            mapping: function (data) {
                return data.System;
            }
        },
        {
            name: 'TechnicalPOC',
            type: 'string',
            mapping: function (data) {
                return data['Technical POC'];
            }
        },
        {
            name: 'TechnologyPlatform',
            type: 'string',
            mapping: function (data) {
                return data['Technology Platform'];
            }
        }
        //,
        // {
        //     name: 'Type',
        //     type: 'string',
        //     mapping: function (data) {
        //         return data[];
        //     }
        // },
        // {
        //     name: 'Url',
        //     type: 'string',
        //     mapping: function (data) {
        //         return data[];
        //     }
        // },
        // {
        //     name: 'Users',
        //     type: 'string',
        //     mapping: function (data) {
        //         return data[];
        //     }
        // }
    ];
};

Application.prototype.apply = function (cols) {
    var obj = {};
    this.fields.forEach(function (field) {
        obj[field.name] = field.mapping.call(field.mapping, cols)
    });
    return obj;
};

module.exports = Application;
