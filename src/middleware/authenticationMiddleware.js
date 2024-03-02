import jwt from 'jsonwebtoken';

const authentificationMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  const secretKey = process.env.AUTH_SECRET_KEY || 'my-secret-key';

  if (!token) {
    return res.status(401).json({ message: 'You cannot access this operation without a token!' });
  }

  //function to throw an error if expired 
  jwt.verify(token, secretKey, { ignoreExpiration: false }, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(403).json({ message: 'Token expired' });
      }
      return res.status(403).json({ message: 'Invalid token provided', error: err.message });
    }

    req.user = decoded;
    next();
  });
};

export default authentificationMiddleware;
