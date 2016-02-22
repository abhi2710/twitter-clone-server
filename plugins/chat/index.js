/**
 * Created by abhi1027 on 10/2/16.
 */
var Handlers = require('./handlers');

exports.register = function (server, options, next) {
    var io = require('socket.io')(server.listener);
    io.on('connection', function (socket) {
        console.log('New connection!');
        socket.on('hello', Handlers.hello);
        socket.on('newMessage', Handlers.newMessage);
        socket.on('goodbye', Handlers.goodbye);
    });
    next();
};

exports.register.attributes = {
    name: 'hapi-chat'
};