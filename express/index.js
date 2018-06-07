const app = require('express')();
const fooRouter = require('./routers/foo');
const bazRouter = require('./routers/baz');

app.use(fooRouter);
app.use(bazRouter);

// fallback route for anything not captured
app.get('*', (req, res) => {
  res.sendStatus(404);
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(3000);
}

module.exports = app;
