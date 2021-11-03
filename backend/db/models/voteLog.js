const {Sequelize, DataTypes, Model} = require('sequelize');
const db = require('../dbconfig');

class VoteLog extends Model {
}

VoteLog.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    ip: {
        type: DataTypes.STRING(100),
        unique: true
    },
    videoId: {
        type: DataTypes.UUID,
        allowNull: false
    },
}, {
    freezeTableName: true,
    timestamps: true,
    sequelize: db,
    modelName: 'VoteLog',
    tableName: 'voteLog'
});


//VoteLog.sync({force: true})

module.exports = db.models.VoteLog;
