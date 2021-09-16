const ErrorHandler = require('./../utils/ErrorHandler.js');

const errorMiddleware = (err, req, res, next) => {
  if (err instanceof ErrorHandler) {
    return res.status(err.status).json({ message: err.message, errors: err.errors });
  }

  return res.status(500).json({ message: 'Server internal error, try again later' });
};

module.exports = errorMiddleware;
