import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import bcrypt from 'bcrypt';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;
const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
