import passport from 'passport';

export const passportCallCurrent = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, { session: false }, function (err, user, info) {
      if (err) return next(err);
      if (!user) {
        // Si no hay usuario, manejar el caso en el que no se proporcionó un token o no hay una cookie válida
        if (info && info.message === 'No token provided') {
          return res.status(401).json({ status: 'error', error: 'No token provided' });
        } else if (info && info.message === 'There is no user with an active session') {
          return res.status(401).json({ status: 'error', error: 'There is no user with an active session' });
        } else {
          return res.status(401).json({ status: 'error', error: 'Unauthorized' });
        }
      }
      req.user = user;
      next();
    })(req, res, next);
  };
};
