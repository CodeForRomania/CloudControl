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
            allowNull: false
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: Date.now()
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: Date.now()
        }
    }, {
        tableName: 'user'
    });
};
