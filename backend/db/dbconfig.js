const { Sequelize } = require('sequelize');

const dbconfig = {
  dbname: 'votetracker',
  dbusername: 'root',
  dbpass: 'root'
}


module.exports = new Sequelize(dbconfig.dbname, dbconfig.dbusername, dbconfig.dbpass, {
  host: 'localhost',
  port: 3306,
  dialect: 'mariadb',
  timezone: "America/New_York",
  logging: false
});

