const router = require('express').Router();
const { common, getBaz } = require('../mware');
const logger = require('../logger');

router.get('/baz', [
  common,
  getBaz,
  (req, res, next) => {
    logger.log(`got baz: ${req.locals.baz}`);
    res.send(req.locals.baz);
  }
]);

router.get('*', [
  (req, res, next) => {
    if (Object.keys(req.locals).length) {
      logger.log(`
Although its not at all clear or obvious,
I am a foo route hitting the baz router.
This is why http specs are important.
This would not be covered in a unit test for a middleware`);

      // change the value of foo indirectly to demonstrate why request specs are important
      Object.keys(req.locals).forEach(local => req.locals[local] = req.locals[local].toUpperCase());
      
      res.send(`foo was changed by baz router to: ${req.locals.foo}`);
    } else {
      next();
    }
  }
]);

module.exports = router;
