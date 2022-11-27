import { Sequelize as sequelizeFramework } from "sequelize";

const Sequelize = sequelizeFramework
const sequelize = new Sequelize('teste', 'Helder', '12345', {
    host: 'localhost',
    dialect: 'mysql',
    query: {raw: true}
});

export {Sequelize, sequelize}