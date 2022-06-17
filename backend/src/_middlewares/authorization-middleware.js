import jwt from 'jsonwebtoken';
import config from '../config';

export default (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    const err = new Error('Missing token');
    err.status = 401;
    next(err);
  } else {
    const tokenBody = token.slice(7);
    jwt.verify(tokenBody, config.jwtSecret, (err, decoded) => {
      if (err) {
        const error = err;
        error.status = 401;
        error.message = 'Invalid token';
        next(error);
      } else {
        req.user = { ...decoded };
        next();
      }
    });
  }
};
