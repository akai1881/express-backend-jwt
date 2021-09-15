const auth = (req, res, next) => {
  const { token } = req.headers;
  console.log('before get request');
  if (token === 'valid') {
    next();
  } else {
    res.status(401).json({ msg: `You're not authorized` });
  }
};

module.exports = auth;
