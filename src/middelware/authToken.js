
import jwt from 'jsonwebtoken';

export const authToken = (req, res, next) => {
  let token = req.headers.auth;
  if (!token) token = req.signedCookies.mysecretjwt;
  if (!token) return res.status(401).json({ error: 'Not auth' });
  jwt.verify(token, 'secret', (error, credentials) => {
    if (error) return res.status(403).json({ error: 'Not authorized' });
    req.user = credentials.user;
    next();
  });
};
