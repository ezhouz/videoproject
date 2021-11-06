const { Sequelize, DataTypes, Model } = require('sequelize');
const db = require('../dbconfig');

class UploaderInfo extends Model {}

UploaderInfo.init({
  id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
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
  },
  uploaderIsConfirmed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
  }
}, {
  freezeTableName: true,
  timestamps: true,
  sequelize: db,
  modelName: 'UploaderInfo',
  tableName: 'uploaderInfo',
  scopes: {
    public: {
      attributes: { exclude: ['uploaderPassword', 'uploaderIsConfirmed'] },
    }
  },
})

//uploaderInfo.sync({force: true})

module.exports = db.models.UploaderInfo;
