// Global middleware for auto-generated controllers: create,list,read,update,delete

// called using special `all` controller reference (see the docs for more)
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
};
