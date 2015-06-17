'use strict';

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('user', {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.TEXT,
            unique: 'compositeIndex',
            allowNull: false
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        salt: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {
        tableName: 'user'
    });
};
