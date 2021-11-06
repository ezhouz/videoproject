const { Sequelize, DataTypes, Model } = require('sequelize');
const db = require('../dbconfig');
const UploaderInfo = require('./uploaderInfo');

class VoteCount extends Model {}

VoteCount.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  muxUploadId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  muxPlaybackId: {
    type: DataTypes.STRING,
    allowNull: true
  },
  fileName: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: ''
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: ''
  },
  votes: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  stripeProductId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  stripePriceId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
}, {
  freezeTableName: true,
  timestamps: true,
  sequelize: db,
  modelName: 'VoteCount',
  tableName: 'voteCount',
  scopes: {
    public: {
      include: {model: UploaderInfo, as: 'uploader'},
      where: {
        isActive: true,
      },
      order: [
        ['title', 'ASC'],
      ]
    }
  }
})

VoteCount.belongsTo(UploaderInfo, {as: 'uploader'});

//voteCount.sync({force: true})

module.exports = db.models.VoteCount;
