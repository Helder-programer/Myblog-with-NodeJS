import express from "express";
import { Post } from '../models/Post.mjs';
export const router = express.Router();


router.get('/', (req, res) => {
    let postToFilter = req.query.search_input;
    if (postToFilter != null && postToFilter != "") {
        Post.findAll({ where: { titulo: postToFilter } }, { order: [['id', 'ASC']] }).then(posts => {
            res.render('home', { post: posts, postToFilter: postToFilter });
        });
    } else {
        Post.findAll({ order: [['id', 'ASC']] }).then(posts => {
            res.render('home', { post: posts });
        });
    }

});

router.get('/editar/:id', (req, res) => {
    Post.findAll({ where: { id: req.params.id } }).then(post => {
        res.render('editar', { post: post });
    }).catch(err => {
        res.send(`Erro. ${err}`);
    });
});

router.post('/salvar_edicao/:id', (req, res) => {
    let title = req.body.titulo;
    let content = req.body.conteudo;
    console.log(title)
    Post.update({ titulo: title, conteudo: content }, { where: { id: req.params.id } }).then(() => {
        res.redirect('/');
    }).catch(err => {
        res.send(`Erro. ${err}`);
    });
});


router.get('/cadastrar', (req, res) => {
    res.render('formulario');
});


router.post('/add', (req, res) => {
    let titulo = req.body.titulo;
    let conteudo = req.body.conteudo;
    Post.create({ titulo: titulo, conteudo: conteudo }).then(result => {
        res.redirect('/');
    }).catch(result => {
        res.send(`Não deu certo: ${result}`);
    });
});


router.get('/deletar/:id', (req, res) => {
    Post.destroy({ where: { 'id': req.params.id } }).then(() => {
        res.redirect('/');
    }).catch((err) => {
        res.send(`Esta postagem não existe: ${err}`);
    });
});

