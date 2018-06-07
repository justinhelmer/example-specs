module.exports = (req, res, next) => {
  req.locals.foo = 'bar'; // could be some async http call
  next();
};
