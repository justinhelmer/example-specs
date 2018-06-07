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

test('/baz route | logs baz', (t) => {
  return request(app)
    .get('/baz')
    .then(() => {
      t.true(logger.log.calledWith('got baz: qux'));
    });
});

test('/baz route | responds with the correct value for baz', () => {
  return request(app)
    .get('/baz')
    .expect(200, 'qux');
});
