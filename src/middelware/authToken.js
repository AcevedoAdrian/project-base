
import passport from 'passport';

export const authToken = async (req, res, next) => {
  passport.authenticate('jwt', function (error, user, info) {
    if (error) return next(error);

    if (!user) {
      return res.status(401).render('errors/base',
        { error: info.messages ? info.messages : info.toString() });
    }
    req.user = user;
    next();
  })(req, res, next);
};
