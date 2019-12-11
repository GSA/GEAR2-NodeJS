const Model = require('./model');

class AppTIMEModel extends Model {
	constructor(f) {
		super(f);
		this.fields = [{
				name: 'ID',
				type: 'int',
				mapping(data) {
					return data.ID;
				},
			},
			{
				name: 'AppId',
				type: 'int',
				mapping(data) {
					return data.ID;
				},
			},
			{
				name: 'Alias',
				type: 'string',
			},
			{
				name: 'Owner',
				type: 'string',
			},
			{
				name: 'OwnerShort',
				type: 'string',
			},
			{
				name: 'SSOShort',
				type: 'string',
			},
			{
				name: 'OwnerShort',
				type: 'string',
			},
			{
				name: 'FY14',
				type: 'string',
				mapping(d) {
					let apptime = null;
					let cb = '';
					if (d.AppTime) {
						apptime = d.AppTime.split('; ');
						apptime = apptime.map((art) => {
							const pieces = art.split(',');
							if (pieces[0] == 'FY14')
								cb = pieces[1];
						});
					}
					return cb;
				},
			},
			{
				name: 'FY15',
				type: 'string',
				mapping(d) {
					let apptime = null;
					let cb = '';
					if (d.AppTime) {
						apptime = d.AppTime.split('; ');
						apptime = apptime.map((art) => {
							const pieces = art.split(',');
							if (pieces[0] == 'FY15')
								cb = pieces[1];
						});
					}
					return cb;
				},
			},
			{
				name: 'FY16',
				type: 'string',
				mapping(d) {
					let apptime = null;
					let cb = '';
					if (d.AppTime) {
						apptime = d.AppTime.split('; ');
						apptime = apptime.map((art) => {
							const pieces = art.split(',');
							if (pieces[0] == 'FY16')
								cb = pieces[1];
						});
					}
					return cb;
				},
			},
			{
				name: 'FY17',
				type: 'string',
				mapping(d) {
					let apptime = null;
					let cb = '';
					if (d.AppTime) {
						apptime = d.AppTime.split('; ');
						apptime = apptime.map((art) => {
							const pieces = art.split(',');
							if (pieces[0] == 'FY17')
								cb = pieces[1];
						});
					}
					return cb;
				},
			},
			{
				name: 'FY18',
				type: 'string',
				mapping(d) {
					let apptime = null;
					let cb = '';
					if (d.AppTime) {
						apptime = d.AppTime.split('; ');
						apptime = apptime.map((art) => {
							const pieces = art.split(',');
							if (pieces[0] == 'FY18')
								cb = pieces[1];
						});
					}
					return cb;
				},
			},
			{
				name: 'FY19',
				type: 'string',
				mapping(d) {
					let apptime = null;
					let cb = '';
					if (d.AppTime) {
						apptime = d.AppTime.split('; ');
						apptime = apptime.map((art) => {
							const pieces = art.split(',');
							if (pieces[0] == 'FY19')
								cb = pieces[1];
						});
					}
					return cb;
				},
			},
			{
				name: 'FY20',
				type: 'string',
				mapping(d) {
					let apptime = null;
					let cb = '';
					if (d.AppTime) {
						apptime = d.AppTime.split('; ');
						apptime = apptime.map((art) => {
							const pieces = art.split(',');
							if (pieces[0] == 'FY20')
								cb = pieces[1];
						});
					}
					return cb;
				},
			},
			{
				name: 'FY21',
				type: 'string',
				mapping(d) {
					let apptime = null;
					let cb = '';
					if (d.AppTime) {
						apptime = d.AppTime.split('; ');
						apptime = apptime.map((art) => {
							const pieces = art.split(',');
							if (pieces[0] == 'FY21')
								cb = pieces[1];
						});
					}
					return cb;
				},
			},
			{
				name: 'FY22',
				type: 'string',
				mapping(d) {
					let apptime = null;
					let cb = '';
					if (d.AppTime) {
						apptime = d.AppTime.split('; ');
						apptime = apptime.map((art) => {
							const pieces = art.split(',');
							if (pieces[0] == 'FY22')
								cb = pieces[1];
						});
					}
					return cb;
				},
			},
{
				name: 'FY23',
				type: 'string',
				mapping(d) {
					let apptime = null;
					let cb = '';
					if (d.AppTime) {
						apptime = d.AppTime.split('; ');
						apptime = apptime.map((art) => {
							const pieces = art.split(',');
							if (pieces[0] == 'FY23')
								cb = pieces[1];
						});
					}
					return cb;
				},
			},
{
				name: 'FY24',
				type: 'string',
				mapping(d) {
					let apptime = null;
					let cb = '';
					if (d.AppTime) {
						apptime = d.AppTime.split('; ');
						apptime = apptime.map((art) => {
							const pieces = art.split(',');
							if (pieces[0] == 'FY24')
								cb = pieces[1];
						});
					}
					return cb;
				},
			},
{
				name: 'FY25',
				type: 'string',
				mapping(d) {
					let apptime = null;
					let cb = '';
					if (d.AppTime) {
						apptime = d.AppTime.split('; ');
						apptime = apptime.map((art) => {
							const pieces = art.split(',');
							if (pieces[0] == 'FY25')
								cb = pieces[1];
						});
					}
					return cb;
				},
			},
{
				name: 'FY26',
				type: 'string',
				mapping(d) {
					let apptime = null;
					let cb = '';
					if (d.AppTime) {
						apptime = d.AppTime.split('; ');
						apptime = apptime.map((art) => {
							const pieces = art.split(',');
							if (pieces[0] == 'FY26')
								cb = pieces[1];
						});
					}
					return cb;
				},
			},
			{
				name: 'Name',
				type: 'string',

			},
			{
				name: 'Owner',
				type: 'string',

			},
			{
				name: 'RegionClassification',
				type: 'string',

			},
			{
				name: 'SSO',
				type: 'string',

			},
			{
				name: 'Status',
				type: 'string',

			},
			// {
			// name: 'ParentSystem',
			// type: 'string',

			// },
			{
				name: 'TIME_Notes',
				type: 'string',

			},
			{
				name: 'BusinessPOC',
				type: 'string',

			},
			{
				name: 'TechnicalPOC',
				type: 'string',

			},
			{
				name: 'OMBUID',
				type: 'string',
			},
			{
				name: 'ProdYear',
				type: 'string',
			},
		];
	}
}

module.exports = AppTIMEModel;