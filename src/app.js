import express from 'express';
import dotenv from 'dotenv';
import { engine } from 'express-handlebars';
import __dirname from './utils.js';
import usersRouter from './routes/users.route.js';
import connectMongoDB from './config/db.js';

// VARIABLE DE ENTORNOS
dotenv.config({ path: '.env' });

const app = express();

// Para manejar json las peticiones
app.use(express.json());
// Cuando envias los datos por un formulario de una vista
app.use(express.urlencoded({ extended: true }));

// Para reconocer los datos staticos
app.use(express.static(__dirname + '/public'));

// CONFIGURACION PLANTILLAS HANDLEBARS
app.engine('handlebars', engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

// CONEXION A BASE DE DATOS MONGO
connectMongoDB();
app.get('/', (req, res) => res.json({ Hola: 'hola' }));
app.use('/api/sessions', usersRouter);

app.listen(8080, () => {
  console.log('Server up');
});
