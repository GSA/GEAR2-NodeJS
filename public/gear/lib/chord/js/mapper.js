//*******************************************************************
//  CHORD MAPPER 
//*******************************************************************
function chordMpr (data) {
  var mpr = {}, mmap = {}, n = 0,
      matrix = [], filter, accessor;

  mpr.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  },
  
  mpr.setFilter = function (fun) {
    filter = fun;
    return this;
  },
  mpr.setAccessor = function (fun) {
    accessor = fun;
    return this;
  },
  mpr.getMatrix = function () {
    matrix = [];
    _.each(mmap, function (a) {
      if (!matrix[a.id]) matrix[a.id] = [];
      _.each(mmap, function (b) {
       var recs = _.filter(data, function (row) {
          return filter(row, a, b);
        })
        matrix[a.id][b.id] = isNaN(accessor(recs, a, b))? 0: accessor(recs, a, b);
      });
    });
    return matrix;
  },
  mpr.getMap = function () {
    return mmap;
  },
  mpr.printMatrix = function () {
    _.each(matrix, function (elem) {
      console.log(elem);
    })
  },
  mpr.addToMap = function (value, info) {
    if (!mmap[value]) {
      mmap[value] = { name: value, id: n++, data: info }
    }
  },
 
  mpr.addValuesToMap = function (varName, info) {
    var values = _.uniq(_.pluck(data, varName));
    var values2 = _.uniq(_.pluck(data, "NameShort2"));
    var indx = -1;
    var aa = 0;
    var bb = 0;
    if (values2.length >= values.length)
    {
      for (aa = 0;aa<values2.length;aa++){
        for (bb = 0; bb< values.length;bb++)
        { if (values2[aa] ===values[bb])
          { indx = 1;
            break;}
          else continue;
        }
        if (indx === -1)
          values.push(values2[aa]);
      }
    }
    var countApp = _.countBy(data, 'NameShort1')>=_.countBy(data, 'NameShort2')?_.countBy(data, 'NameShort1'):_.countBy(data, 'NameShort2');
        
    var len = data.length;
    var co = 0;
    var info = {};
    _.map(values, function (v) {
      if (!mmap[v]) {
        for (co = 0; co < len; co++ )
        {
          if (data[co].NameShort1 === v)
          {
          info = {
            "id1": data[co].AppID1,
            "SSO1": data[co].SSO1,
            "Name1": data[co].Name1,
            "SSOShort1": data[co].SSOShort1,
            "Owner1": data[co].Owner1,
            "OwnerShort1": data[co].OwnerShort1,
			"System1": data[co].System1,
            "countApp": countApp[v]
            };
          break;
          }         
        }
        mmap[v] = { name: v, id: n++, data: info }
      }
    });
    return this;
  }
  return mpr;
}
//*******************************************************************
//  CHORD READER
//*******************************************************************
function chordRdr (matrix, mmap) {
  return function (d) {
    var i,j,s,t,g,m = {};
    if (d.source) {
      i = d.source.index; j = d.target.index;
      s = _.where(mmap, {id: i });
      t = _.where(mmap, {id: j });
      m.sname = s[0].name;
      m.ssso = s[0].data.SSO1;
      m.sid = s[0].data.id1;
      m.snamelong = s[0].data.Name1;
      m.sssoshort = s[0].data.SSOShort1;
      m.sowner = s[0].data.Owner1;
      m.sownershort = s[0].data.OwnerShort1;
	  m.ssystem = s[0].data.System1;
      m.sdata = d.source.value;
      m.svalue = +d.source.value;
      m.stotal = _.reduce(matrix[i], function (k, n) { return k + n }, 0);
      m.tname = t[0].name;
      m.tid = t[0].data.id1;
      m.tsso = t[0].data.SSO1;
      m.tnamelong = t[0].data.Name1;
      m.tssoshort = t[0].data.SSOShort1;
      m.towner = t[0].data.Owner1;
      m.townershort = t[0].data.OwnerShort1;
	  m.tsystem = t[0].data.System1;
      m.tdata = d.target.value;
      m.tvalue = +d.target.value;
      m.ttotal = _.reduce(matrix[j], function (k, n) { return k + n }, 0);
    } else {
      g = _.where(mmap, {id: d.index });
      m.gname = g[0].name;
      m.gid = g[0].data.id1;
      m.gsso = g[0].data.SSO1;
      m.gnamelong = g[0].data.Name1;
      m.gssoshort = g[0].data.SSOShort1;
      m.gowner = g[0].data.Owner1;
      m.gownershort = g[0].data.OwnerShort1;
	  m.gsystem = g[0].data.System1;
      m.gdata = g[0].data;
      m.gvalue = g[0].data.countApp;
      // m.gvalue = d.value;
    }
    m.mtotal = _.reduce(matrix, function (m1, n1) { 
      return m1 + _.reduce(n1, function (m2, n2) { return m2 + n2}, 0);
    }, 0);
    return m;
  }
}
