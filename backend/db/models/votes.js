const { Sequelize, DataTypes } = require('sequelize');
const db = require('../dbconfig');

const votes = db.define('votes', {
  ip: {
    type: DataTypes.STRING,
    allowNull: false
  },
  count: {
    type: DataTypes.NUMBER,
    allowNull: false
  }
}, {
  freezeTableName: true,
  timestamps: false
})

votes.sync({force: true})

module.exports = votes;