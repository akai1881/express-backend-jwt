const jwt = require('jsonwebtoken');

const { SECRET_KEY, REFRESH_SECRET_KEY } = process.env;

class TokenService {
  static generateTokens = (data) => {
    const accessToken = jwt.sign(data, SECRET_KEY, { expiresIn: '5h' });
    const refreshToken = jwt.sign(data, REFRESH_SECRET_KEY, { expiresIn: '24h' });
    return {
      accessToken,
      refreshToken,
    };
  };

  static validateToken = (token) => {
    try {
      const tokenData = jwt.verify(token, SECRET_KEY);
      return tokenData;
    } catch (e) {
      return null;
    }
  };
}

module.exports = TokenService;
