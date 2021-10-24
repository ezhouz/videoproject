const { Sequelize, DataTypes } = require('sequelize');
const db = require('../dbconfig');

const voteCount = db.define('voteCount', {
  muxVideoId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  uploadedVideoFileName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  voteTally: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  stripeProductId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  stripePriceId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  uploaderId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  uploaderEmail: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  freezeTableName: true,
  timestamps: false
})

//voteCount.sync({force: true})

module.exports = voteCount;
