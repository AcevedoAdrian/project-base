import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
const isValidPssword = (user, password) => bcrypt.compareSync(password, user.password);

export const generateToken = user => {
  const secret = process.env.PRIVATE_KEY_JWT;
  // jwt.sing('objeto informacion', 'clave para hacer cifrado', 'tiempo de vida')
  const token = jwt.sign({ user }, secret, { expiresIn: '24h' });
  return token;
};

export default __dirname;
export {
  createHash,
  isValidPssword
};
