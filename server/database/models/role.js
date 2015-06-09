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
        }
    }, {
        tableName: 'role'
    });
};
