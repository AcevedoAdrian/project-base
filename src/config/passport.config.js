import passport from 'passport';
import local from 'passport-local';
import jwt from 'passport-jwt';

import userModel from '../dao/models/users.model.js';
import { cookieExtractor, generateToken } from '../utils.js';

// core de la estrategia de local
const LocalStrategy = local.Strategy;
// core de la estrategia de jwt
const JWTStrategy = jwt.Strategy;
// Extrator de jwt ya sea de header o cookies
const ExtractJWT = jwt.ExtractJwt;

const initializePassport = () => {
  // REGISTER
  passport.use(
    'register',
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: 'email'
      },
      async (req, username, password, done) => {
        try {
          const { first_name, last_name, age, email } = req.body;
          if ((!first_name, !last_name, !age, !email, !password)) {
            console.log('Campos vacios');
            return done(null, false, { message: 'No se aceptan campos vacios' });
          }
          if (password.length < 4) {
            console.log('Password corto');
            return done(null, false, { message: 'Password muy corto' });
          }

          const user = await userModel.findOne({ email: username });
          if (user) {
            console.log('User already exits');
            return done(null, false, { message: 'Usuario ya existe' });
          }

          const newUser = {
            first_name,
            last_name,
            email,
            age,
            password,
            role: email === 'admin@gmail.com' ? 'admin' : 'user'
          };
          const userCreater = await userModel.create(newUser);
          // console.log(`log ${userCreater}`);
          return done(null, userCreater);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
  // LOGIN
  passport.use(
    'login', new LocalStrategy({
      usernameField: 'email'
    }, async (username, password, done) => {
      try {
        const user = await userModel.findOne({ email: username });
        if (!user) {
          console.log('usuario no existe');
          return done(null, false, { message: 'Usuario o Password incorrecto ' });
        }
        const validete = await user.isValidPassword(password);
        if (!validete) {
          console.log('password icorrecto');
          return done(null, false, { message: 'Usuario o Password incorrecto ' });
        }
        const token = generateToken(user);
        user.token = token;
        return done(null, user, { message: 'LOGIN CORRECTO' });
      } catch (error) {
        return done(error);
      }
    }));
  passport.use(
    'jwt',
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: process.env.JWT_PRIVATE_KEY
      },
      async (jwt_payload, done) => {
        console.log('jasdasdwt');
        try {
          return done(null, jwt_payload);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await userModel.findById(id);
    done(null, user);
  });
};

export default initializePassport;
