/**
 * Created by abhinav on 1/25/2016.
 */
var Inert = require('inert'),
    Vision = require('vision');
module.exports = [
    Inert,
    Vision,
    {register:require('./chat/index')},
    {register: require('./swagger')},
    {register: require('./good-console')}
];