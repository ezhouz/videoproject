const { Sequelize, DataTypes } = require('sequelize');
const db = require('../dbconfig');

const voterInfo = db.define('voterInfo', {
  ip: {
    type: DataTypes.STRING,
    allowNull: false
  },
  videoName: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  freezeTableName: true,
  timestamps: false
})

voterInfo.sync({force: true})

module.exports = voterInfo;
