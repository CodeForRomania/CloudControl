"use strict";
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('role', {
        role_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.TEXT
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
        tableName: 'role'
    });
};
