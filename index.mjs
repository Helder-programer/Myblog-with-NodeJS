//IMPORTS
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
const app = express();
import { engine } from 'express-handlebars';
import bodyParser from 'body-parser';
import { Post } from './models/Post.mjs';
import { rmSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


//Config BodyParser
app.use(bodyParser.urlencoded({ extended: false }));


app.use(bodyParser.json());

//Config handlebars
app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//ROUTERS
app.get('/cadastro', (req, res) => {
    res.render('formulario');
});

app.get('/', (req, res) => {
    Post.findAll({order: [['id', 'ASC']]}).then(posts => {
        res.render('home', { post: posts });
    });
});


app.post('/add', (req, res) => {
    let titulo = req.body.titulo;
    let conteudo = req.body.conteudo;
    Post.create({ titulo: titulo, conteudo: conteudo }).then(result => {
        res.redirect('/');
    }).catch(result => {
        res.send(`Não deu certo: ${result}`);
    });
});


app.get('/deletar/:id', (req, res) => {
    Post.destroy({where: {'id': req.params.id}}).then(()=>{
        res.send('Postagem deletada com sucesso');
    }).catch((err) => {
        res.send(`Esta postagem não existe: ${err}`);
    })
} )

app.listen(8080, () => {
    console.log('Servidor rodando normalmente');
});




//Rota é o caminho que a aplicação faz
//NÃO PODER TER NADA ABAIXO DESSA LINHA