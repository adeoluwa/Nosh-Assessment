const {verifyToken} = require('../middleware/authenticate.js');

const jwt = require('jsonwebtoken')


module.exports = (permission) => {
  return async (req, res, next) => {

    try {

      await verifyToken(req, res, next)
      const decodedToken = jwt.verify(req.headers['authorization'], process.env.JWT_SECRET_KEY);
      const user = decodedToken.user;


      if (!user.permissions.includes(permission)) {
        return res.status(403).json({ msg: 'Forbidden' });
      }

      next();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
};
