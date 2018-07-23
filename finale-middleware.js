// Global middleware for auto-generated controllers: create,list,read,update,delete
var finaleVar = require('./finale-var');

// called using special `all` controller reference below (see the docs for more)
const addContentRange = function (res, context) {
  if (context.instance.length) {
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
  read: {
    // send: (req, res, context) => {
    //   console.log('\n\nwoppididoodoo\n\n')
    //   console.log(context.instance);
    //   res.json(context.instance);
    //   return context.continue;
    //   // return context.continue;
    // },
    // send:{
    //   before: (req, res, context) => {
    //     console.log('\n\nwoppididoodoo\n\n')
    //     context.instance.capabilities = [3];
    //     console.log(context.instance.capabilities);
    //     return context.continue;
    //   }
    // },
  },
  update: {
    write: {
      after: (req, res, context) => {
        // console.log('Generic Hello world');
        // console.log(JSON.stringify(context, null, "  "));
        // EXAMPLE: context.instance.setCapabilities(context.instance.capabilities);
        context.options.include.forEach((field) => {
          const setter = 'set' + field[0].toUpperCase() + field.slice(1);
          context.instance[setter].call(context.instance, context.instance[field]);
        })
        return context.continue;
      }
    }
  }
};
