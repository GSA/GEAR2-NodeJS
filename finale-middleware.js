// Global middleware for auto-generated controllers: create,list,read,update,delete
module.exports = {
  list: {
    fetch: (req, res, context) => {
      res.set('X-Total-Count', context.instance.length);
      res.set('Access-Control-Expose-Headers', 'Content-Range, X-Total-Count');
      return context.continue;
    }
  }
};
