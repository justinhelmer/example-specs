import test from 'ava';
import { spy } from 'sinon';
import common from '../common';

test('it should set up req.locals', (t) => {
  const req = {};
  common(req, null, () => {});
  t.deepEqual(req.locals, {});
});

test('it should call next', (t) => {
  const req = {};
  const next = spy();
  common(req, null, next);
  t.true(next.called);
});
