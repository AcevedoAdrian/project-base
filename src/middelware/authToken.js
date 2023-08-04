
import passport from 'passport';

export const authToken = strategy => {
  return async (req, res, next) => {
    passport.authenticate(strategy, function (err, user, info) {
      if (err) return next(err);
      if (!user) return res.status(401).render('errors/base', { error: info.messages ? info.messages : info.toString() });

      req.user = user;
      next();
    })(req, res, next);
  };
};
