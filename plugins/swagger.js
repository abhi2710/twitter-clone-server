/**
 * Created by abhinav on 1/25/2016.
 */
var pack = require('../package'),
    swaggerOptions = {
        info: {
            'title': 'TWEETY',
            'version': pack.version,
        },
        'payloadType': "form"
    };
exports.register = function(server, options, next){

    server.register({
        register: require('hapi-swagger'),
        options: swaggerOptions
    }, function (err) {
        if (err) {
            server.log(['error'], 'hapi-swagger load error: ' + err)
        }else{
            server.log(['start'], 'hapi-swagger interface loaded')
        }
    });

    next();
};

exports.register.attributes = {
    name: 'swagger-plugin'
};