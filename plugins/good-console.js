/**
 * Created by abhinav on 1/25/2016.
 */

var Good = require('good');

exports.register = function (server, options, next) {

    server.register({
        register: Good,
        options: {
            reporters: [{
                reporter: require('good-console'),
                events: {
                    response: '*',
                    error: '*',
                    log: '*'
                }
            }]
        }
    }, function (err) {
        if (err) {
            throw err;
        }
    });

    next();
};

exports.register.attributes = {
    name: 'good-console-plugin'
};