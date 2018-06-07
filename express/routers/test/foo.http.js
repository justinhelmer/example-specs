import test from 'ava';
import { stub } from 'sinon';
import request from 'supertest';
import logger from '../../logger';
import app from '../..';

test.before(() => {
  stub(logger, 'log');
});

test.after(() => {
  logger.log.restore();
});

test('/foo route | logs foo', (t) => {
  return request(app)
    .get('/foo')
    .then(() => {
      t.true(logger.log.calledWith('got foo: bar'));
    });
});

test('/foo route | logs help info', (t) => {
  return request(app)
    .get('/foo')
    .then(() => {
      t.true(logger.log.calledWith(`
ID does not exist, but earlier middleware was run:
  - common mware set up req.locals = {}
  - getFoo mware set up req.locals.foo = bar`));
    });
});

test('/foo route | responds with baz route fallback', (t) => {
  return request(app)
    .get('/foo')
    .expect(200, 'foo was changed by baz router to: BAR')
    .then(() => {
      t.true(logger.log.calledWith(`
Although its not at all clear or obvious,
I am a foo route hitting the baz router.
This is why http specs are important.
This would not be covered in a unit test for a middleware`));
    });
});

test('/foo/:id route | logs help info', (t) => {
  return request(app)
    .get('/foo/789')
    .then(() => {
      t.true(logger.log.calledWith(`
ID (789) exists, meaning earlier middleware was not run
  - getFoo mware was not run; req.locals.foo never set
  - common mware was not run; req.locals never set
  - calling req.locals.foo will throw an Error`));
    });
});

test('/foo/:id route | responds with ID', () => {
  return request(app)
    .get('/foo/456')
    .expect(200, '456');
});
