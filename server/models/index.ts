const Sequelize = require('sequelize');
require('dotenv').config()


const sequelize = new Sequelize(process.env.DATABASE, process.env.USERNAME, process.env.PASSWORD, {
  host: process.env.HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DIALECT || 'postgres',
  logging: false
});
const db:any = {};
db.Users = require('./users')(sequelize, Sequelize.DataTypes);

db.Ais = require('./ais')(sequelize, Sequelize.DataTypes);

db.Users.hasMany(db.Ais);
db.Ais.belongsTo(db.Users);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export {db};