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
    if (!req.user) return res.status(400).send({ status: 'error', error: 'Credencial invalid' });
    console.log(req.user);
    res.send({ status: 'success', payload: req.user });
  });
router.get('/faillogin', async (req, res) => {
  console.log('Failed Register Strategi');
  res.json({ error: 'failed' });
});
export default router;
