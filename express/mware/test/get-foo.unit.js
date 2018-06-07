import test from 'ava';
import { spy } from 'sinon';
import getFoo from '../get-foo';

test('it should set req.locals.foo to the correct value', (t) => {
  const req = { locals: {} };
  getFoo(req, null, () => {});
  t.is(req.locals.foo, 'bar');
});

test('it should call next', (t) => {
  const req = { locals: {} };
  const next = spy();
  getFoo(req, null, next);
  t.true(next.called);
});
