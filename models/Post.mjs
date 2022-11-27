import * as database from './database.mjs';

export const Post = database.sequelize.define('tb_postagens',  {
    titulo: {
        type: database.Sequelize.STRING(250)
    },
    conteudo: {
        type: database.Sequelize.TEXT
    }
});

