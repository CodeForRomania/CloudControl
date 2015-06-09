"use strict";
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('group', {
        group_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.TEXT
        }
    }, {
        tableName: 'group'
    });
};

