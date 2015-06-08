"use strict";
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('profile', {
        profile_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.TEXT
        },
        avatar: {
            type: DataTypes.TEXT
        },
        verified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
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
        tableName: 'profile'
    });
};
