// Global middleware for auto-generated controllers: create,list,read,update,delete
var finaleVar = require('./finale-var');

// called using special `all` controller reference below (see the docs for more)
const addContentRange = function (res, context) {
  if (context.instance && context.instance.length) {
    res.set('X-Total-Count', context.instance.length);
  }
  res.set('Access-Control-Expose-Headers', 'Content-Range, X-Total-Count');
};

module.exports = {
  all: {
    send:{
      before: (req, res, context) => {
        addContentRange.call(this, res, context);
        return context.continue;
      }
    },
  },
  // list: {
  //   start: {
  //     before: (req, res, context) => {
  //       // TODO: determine if we can move the edits to Finale source code here.
  //     }
  //   },
  // },
  update: {
    write: {
      // TODO: formal documentation
      // Fixes bug where child associations would never get written to the db
      after: (req, res, context) => {
        if (context.options && context.options.include) {
          context.options.include.forEach((field) => {
            const setter = 'set' + field[0].toUpperCase() + field.slice(1);
            context.instance[setter].call(context.instance, context.instance[field]);
          })
        }
        return context.continue;
      }
    }
  }
};
