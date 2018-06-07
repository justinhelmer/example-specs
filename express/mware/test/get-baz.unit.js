import test from 'ava';
import { spy } from 'sinon';
import getBaz from '../get-baz';

test('it should set req.locals.baz to the correct value', (t) => {
  const req = { locals: {} };
  getBaz(req, null, () => {});
  t.is(req.locals.baz, 'qux');
});

test('it should call next', (t) => {
  const req = { locals: {} };
  const next = spy();
  getBaz(req, null, next);
  t.true(next.called);
});
