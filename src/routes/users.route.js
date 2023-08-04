import { Router } from 'express';
import passport from 'passport';
import { loginUser, registerUser } from '../controllers/users.controller.js';
const router = Router();

router.get('/register', registerUser);
router.post('/register',
  passport.authenticate(
    'register',
    {
      session: false,
      failureRedirect: '/failregister'
    }
  ),
  async (req, res, next) => (
    res.redirect('/login')
  ));
router.get('/failregister', async (req, res) => {
  console.log('Failed Register Strategi');
  res.json({ error: 'failed' });
});

router.get('/login', loginUser);
router.post('/login',
  passport.authenticate(
    'login',
    {
      session: false,
      failureRedirect: '/failregister'
    }
  ), async (req, res, next) => {
    if (!req.user) {
      return res.status(400).send({ status: 'error', error: 'Credencial invalida' });
    }
    // guardo el toque que tengo almacenado en el user que me mando desde passport en la cookie de forma firmada
    res.cookie(process.env.JWT_NAME_COOKIE, req.user.token, { signed: true })
      .redirect('/api/sessions/current');
    // res.send({ status: 'success', payload: req.user });
  });
router.get('/faillogin', async (req, res) => {
  console.log('Failed Register Strategi');
  res.json({ error: 'failed' });
});

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.send(req.user);
});
// Cerrar Session
router.get('/logout', (req, res) => {
  res.clearCookie(process.env.JWT_NAME_COOKIE).redirect('/');
});

router.get('/current2', passport.authenticate('jwt'), (req, res) => {
  res.send(req.user);
});
export default router;
