const { Sequelize, DataTypes } = require('sequelize');
const db = require('../dbconfig');

const uploaderInfo = db.define('uploaderInfo', {
  uploaderName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  uploaderDOBEnglish: {
    type: DataTypes.STRING,
    allowNull: false
  },
  uploaderDOBHebrew: {
    type: DataTypes.STRING,
    allowNull: false
  },
  videoFileName: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  freezeTableName: true,
  timestamps: false
})

uploaderInfo.sync({force: true})

module.exports = uploaderInfo;
