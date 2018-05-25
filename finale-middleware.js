// Global middleware for auto-generated controllers: create,list,read,update,delete
module.exports = {
  list: {
    fetch: (req, res, context) => {
      res.set('X-Total-Count', context.instance.length);
      res.set('Access-Control-Expose-Headers', 'Content-Range, X-Total-Count');
      return context.continue;
    }
  },
  update:
    {
      // start: (req, res, context) => { console.log(context); return context.continue; },
      // auth: (req, res, context) => { console.log(context); return context.continue; },
      // fetch: (req, res, context) => { console.log(context); return context.continue; },
      // data: (req, res, context) => { console.log(context); return context.continue; },
      write: (req, res, context) => {
        console.log(`\n\nMIDDLEWARE IN EFFECT\n`);
        // console.log(context.instance.dataValues);
        // console.log('Iterate over "include" objects);

        context.instance.dataValues['fismaArtifact'].forEach((instance) => {
          console.log(instance);
          console.log('--------------');
        });

        console.log(`\nMIDDLEWARE EFFECT OVER\n\n`);
        return context.continue;
      },
      // send: (req, res, context) => { console.log(`\nSEND\n ${context.instance.dataValues['fismaArtifact']}`); return context.continue; },
      // complete: (req, res, context) => { console.log(context); return context.continue; },
    }
};
