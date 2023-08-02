import express from 'express';
import userRouter from './routes/user.route.js';
import { engine } from 'express-handlebars';
const app = express();

app.use(express.static('public'));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

app.use('/users', userRouter);

app.listen(8080, () => {
  console.log('Server up');
});
