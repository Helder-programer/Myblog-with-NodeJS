//IMPORTS
import express from 'express';
import path from 'path';
import { router as postRouter} from './routes/posts.mjs';
import { fileURLToPath } from 'url';
const app = express();
import { engine } from 'express-handlebars';
import bodyParser from 'body-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


//Config BodyParser
app.use(bodyParser.urlencoded({ extended: false }));


app.use(bodyParser.json());

//Config handlebars
app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
//Config static files
app.use(express.static(path.join(__dirname, 'public')));

//ROUTES
app.use('/', postRouter);


const PORT = 8080;
app.listen(PORT, () => {
    console.log('Servidor rodando normalmente');
});

//Rota é o caminho que a aplicação faz
//NÃO PODER TER NADA ABAIXO DESSA LINHA