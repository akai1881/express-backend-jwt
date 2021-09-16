const TokenService = require('../services/token-service');
const ErrorHandler = require('../utils/ErrorHandler');

const authMiddleware = (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    console.log(req.headers);
    console.log(authorization);
    if (!authorization) {
      return next(ErrorHandler.UnauthorizedError());
    }

    const accessToken = authorization.split(' ')[1];

    if (!accessToken) {
      return next(ErrorHandler.UnauthorizedError());
    }

    const tokenData = TokenService.validateToken(accessToken);

    if (!tokenData) {
      return next(ErrorHandler.UnauthorizedError());
    }

    req.student = tokenData;
    next();
  } catch (e) {
    return next(ErrorHandler.UnauthorizedError());
  }
};

module.exports = authMiddleware;
