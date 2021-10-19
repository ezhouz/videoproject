const { Sequelize, DataTypes } = require('sequelize');
const db = require('../dbconfig');

const uploaderInfo = db.define('uploaderInfo', {
  uploaderFirstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  uploaderLastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  uploaderEmail: {
    type: DataTypes.STRING,
    allowNull: false
  },
  uploaderPassword: {
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
  }
}, {
  freezeTableName: true,
  timestamps: false
})

//uploaderInfo.sync({force: true})

module.exports = uploaderInfo;
