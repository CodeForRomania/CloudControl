'use strict';

var Sequelize = require('sequelize'),
    sequelizeConfig = {
        host: 'localhost',
        dialect: 'sqlite',
        storage: "database/db/database.sqlite",
        port: 1200,
        define: {
            // don't add the timestamp attributes (updatedAt, createdAt)
            timestamps: false,
            // don't use camelcase for automatically added attributes but underscore style
            // so updatedAt will be updated_at
            underscored: true,
            // disable the modification of tablenames; By default, sequelize will automatically
            // transform all passed model names (first parameter of define) into plural.
            // if you don't want that, set the following
            freezeTableName: true
        },
        pool: {
            max: 3,
            min: 0,
            idle: 1000
        }
    };

var sequelize = new Sequelize('database', 'user', 'pass', sequelizeConfig);

sequelize
    .authenticate()
    .catch(function(err) {
        if (!!err) {
            console.log('Unable to connect to the database:', err);
            process.exit(1);
        }
    });

// loading the models. New models should be appended at the end of the file.
var models = [{
    name: 'User',
    file: 'user'
}, {
    name: 'Profile',
    file: 'profile'
}, {
    name: 'Group',
    file: 'group'
}, {
    name: 'Role',
    file: 'role'
}];

models.forEach(function(model) {
    module.exports[model.name] = sequelize.import(__dirname + '/models/' + model.file + '.js');
});

// describe relationships
(function(m) {
    m.Profile.belongsTo(m.User, {
        foreignKey: 'user_id'
    });

    m.User.sync();
    m.Profile.sync();
    m.Role.sync();
    m.Group.sync();

    m.User.create({
        email: "admin@admin.com",
        password: "password"
    }).then(function(user) {
        m.Profile.create({
            user_id: user.user_id,
            name: "Razvan Moraru",
            avatar: "http://avatar.com"
        });
    });

    [{
        name: 'master'
    }, {
        name: 'admin'
    }, {
        user: 'user'
    }].forEach(function(role) {
        m.Role.create(role);
    });

    [{
        name: 'developers'
    }, {
        name: 'ops'
    }].forEach(function(group) {
        m.Group.create(group);
    });

})(module.exports);

// export connection
module.exports.sequelize = sequelize;
