module.exports = (req, res, next) => {
  req.locals.baz = 'qux'; // could be some async http call
  next();
};
