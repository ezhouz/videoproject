const { Sequelize, DataTypes } = require('sequelize');
const db = require('../dbconfig');

const voteCount = db.define('voteCount', {
  videoName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  voteTally: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  freezeTableName: true,
  timestamps: false
})

voteCount.sync({force: true})

module.exports = voteCount;
