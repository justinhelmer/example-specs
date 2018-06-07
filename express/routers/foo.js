const router = require('express').Router();
const { common, getFoo } = require('../mware');
const logger = require('../logger');

router.get('/foo', [
  common,
  getFoo,
  (req, res, next) => {
    logger.log(`got foo: ${req.locals.foo}`);
    next();
  }
]);

router.get('/foo(/:id)?', [
  (req, res, next) => {
    if (req.params.id) {
      logger.log(`
ID (${req.params.id}) exists, meaning earlier middleware was not run
  - getFoo mware was not run; req.locals.foo never set
  - common mware was not run; req.locals never set
  - calling req.locals.foo will throw an Error`
      );

      res.send(req.params.id);
    } else {
      logger.log(`
ID does not exist, but earlier middleware was run:
  - common mware set up req.locals = {}
  - getFoo mware set up req.locals.foo = ${req.locals.foo}`
      );
      next();
    }
  }
]);

module.exports = router;
