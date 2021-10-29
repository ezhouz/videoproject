const { Sequelize, DataTypes } = require('sequelize');
const db = require('../dbconfig');

const uploadedVideoInfo = db.define('uploaderInfo', {
  // user uploader id
  uploaderId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  uploaderEmail: {
    type: DataTypes.STRING,
    allowNull: false
  },
  videoUploadId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  videoPlaybackId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  stripeProductId: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  freezeTableName: true,
  timestamps: false
})

uploaderInfo.sync({force: true})

module.exports = uploadedVideoInfo;
