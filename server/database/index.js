'use strict';

var Sequelize = require('sequelize'),
    configParams = require('../' + (process.env.NODE_ENV) + '.json'),
    sequelizeConfig = {
        host: configParams.db.host,
        dialect: configParams.db.dialect,
        port: configParams.db.port,
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

var sequelize = new Sequelize(configParams.db.database, configParams.db.user, configParams.db.pass, sequelizeConfig);

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
    name: 'Person',
    file: 'person'
}, {
    name: 'Product',
    file: 'product'
}, {
    name: 'Survey',
    file: 'survey'
}, {
    name: 'SurveyQuestion',
    file: 'surveyQuestion'
}, {
    name: 'SurveyHasQuestions',
    file: 'surveyHasQuestions'
}, {
    name: 'SurveyAnswer',
    file: 'surveyAnswer'
}, {
    name: 'SurveyResponse',
    file: 'surveyResponse'
}, {
    name: 'SurveyResponseSuggestion',
    file: 'surveyResponseSuggestion'
}, {
    name: 'Team',
    file: 'team'
}, {
    name: 'TeamWorksOn',
    file: 'teamWorksOn'
}, {
    name: 'SurveyResponseStatView',
    file: 'surveyResponseStatView'
}, {
    name: 'SurveyExpandedResponseView',
    file: 'surveyExpandedResponseView'
}, {
    name: 'SurveySuggestionView',
    file: 'surveySuggestionView'
}, {
    name: 'Approval',
    file: 'approval'
}, {
    name: 'Change',
    file: 'change'
}, {
    name: 'Patchset',
    file: 'patchset'
}, {
    name: 'Dump',
    file: 'dump'
}, {
    name: 'DumpThread',
    file: 'dumpThread'
}, {
    name: 'DumpExpandedView',
    file: 'dumpExpandedView'
}, {
    name: 'UserPrefs',
    file: 'userPrefs'
}];

models.forEach(function(model) {
    module.exports[model.name] = sequelize.import(__dirname + '/models/' + model.file + '.js');
});

// describe relationships
(function(m) {
    m.Person.belongsTo(m.Team, {
        foreignKey: 'team_id'
    });
    m.Team.hasMany(m.Person, {
        foreignKey: 'team_id'
    });

    m.Product.belongsToMany(m.Team, {
        through: m.TeamWorksOn,
        foreignKey: 'prod_id'
    });
    m.Team.belongsToMany(m.Product, {
        through: m.TeamWorksOn,
        foreignKey: 'team_id'
    });

    m.Survey.belongsTo(m.Team, {
        foreignKey: 'team_id'
    });
    m.Team.hasMany(m.Survey, {
        foreignKey: 'team_id'
    });

    m.SurveyQuestion.belongsToMany(m.Survey, {
        through: m.SurveyHasQuestions,
        foreignKey: 'question_id'
    });
    m.Survey.belongsToMany(m.SurveyQuestion, {
        through: m.SurveyHasQuestions,
        foreignKey: 'survey_id'
    });

    m.SurveyAnswer.belongsTo(m.SurveyQuestion, {
        foreignKey: 'question_id'
    });
    m.SurveyQuestion.hasMany(m.SurveyAnswer, {
        foreignKey: 'question_id'
    });

    m.SurveyAnswer.belongsToMany(m.Survey, {
        through: m.SurveyResponse,
        foreignKey: 'answer_id'
    });
    m.Survey.belongsToMany(m.SurveyAnswer, {
        through: m.SurveyResponse,
        foreignKey: 'survey_id'
    });

    m.SurveyResponseSuggestion.belongsTo(m.Survey, {
        foreignKey: 'survey_id'
    });
    m.Survey.hasMany(m.SurveyResponseSuggestion, {
        foreignKey: 'survey_id'
    });

    m.Survey.hasOne(m.SurveyResponseStatView, {
        foreignKey: 'survey_id'
    });
    m.Team.hasOne(m.SurveyResponseStatView, {
        foreignKey: 'team_id'
    });

    m.SurveyResponseStatView.hasMany(m.SurveyExpandedResponseView, {
        foreignKey: 'survey_id'
    });

    m.Product.belongsToMany(m.Team, {
        through: m.TeamWorksOn,
        foreignKey: 'prod_id'
    });
    m.Team.belongsToMany(m.Product, {
        through: m.TeamWorksOn,
        foreignKey: 'team_id'
    });

    m.Team.hasMany(m.TeamWorksOn, {
        foreignKey: 'team_id'
    });

    m.Product.hasMany(m.Change, {
        foreignKey: 'prod_name'
    });
    m.Change.belongsTo(m.Product, {
        foreignKey: 'prod_name'
    });

    // unable to define more than one foreign key in hasMany/belongsToMany relationship
    m.Change.hasMany(m.Patchset);
    // belongsToMany without params creates a warning
    // m.Patchset.belongsToMany(m.Change);

    // unable to define more than one foreign key in hasMany/belongsToMany relationship
    m.Patchset.hasMany(m.Approval);
    // belongsToMany without params creates a warning
    // m.Approval.belongsToMany(m.Patchset);

    m.Product.hasMany(m.Dump, {
        foreignKey: 'prod_id'
    });
    m.Dump.belongsTo(m.Product, {
        foreignKey: 'prod_id'
    });

    m.Team.hasMany(m.Dump, {
        foreignKey: 'team_id'
    });
    m.Dump.belongsTo(m.Team, {
        foreignKey: 'team_id'
    });

    m.Dump.hasMany(m.DumpThread, {
        foreignKey: 'dump_id'
    });
    m.DumpThread.belongsTo(m.Dump, {
        foreignKey: 'dump_id'
    });
})(module.exports);

// export connection
module.exports.sequelize = sequelize;

