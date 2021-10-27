const { Sequelize } = require('sequelize');

const dbconfig = {
  dbname: 'votetracker',
  dbusername: process.env.DB_USERNAME || 'root',
  dbpass: process.env.DB_PASSWORD || 'root'
}


module.exports = new Sequelize(dbconfig.dbname, dbconfig.dbusername, dbconfig.dbpass, {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql',
  timezone: "America/New_York",
  dialectOptions: {
    timezone: "local",
  },
  logging: false
});

