/**
 * Created by abhinav on 1/25/2016.
 */
var Joi=require('joi'),
    controller = require('../../Controllers/index');



var Register = function(req, res, next) {
    req.assert('username', 'username cannot be blank').notEmpty();
    req.assert('password', 'Password cannot be blank').notEmpty();
    req.assert('email', 'email cannot be blank').notEmpty();
    req.assert('email', 'email is not valid').isEmail();
    req.assert('firstname', 'firstname cannot be blank').notEmpty();
    req.assert('lastname', 'lastname cannot be blank').notEmpty();
    req.assert('phone', 'Phone number cannot be blank').notEmpty();
    req.assert('latitude', 'needs to be a number').isInt();
    req.assert('longitude','needs to be a number').isInt();

    var errors = req.validationErrors();
    if (errors) {
        var error={};
        for(key in errors){
            error[errors[key].param]=errors[key].msg;
        }
        res.writeHead(400, {'Content-Type':'application/json'});
        res.write(JSON.stringify(error));
        res.end();
    }
    else {
        controller.userBaseController.register(req.body.email,req.body.username,req.body.firstname,req.body.lastname,
            req.body.password,req.body.phone,req.body.latitude,req.body.longitute,function(err,result) {
            res.writeHead(result.statusCode, {'Content-Type': 'application/json'});
            res.write(JSON.stringify(result.response));
            res.end();
        });
    }
};


var verifyEmail = function(req, res, next) {
    controller.verificationController.verify(req.query.token,function (err, result) {
            res.writeHead(result.statusCode, {'Content-Type': 'application/json'});
            res.write(JSON.stringify(result.response));
            res.end();
        });
};

var Login = function(req, res, next) {
    req.assert('username', 'username cannot be blank').notEmpty();
    req.assert('password', 'Password cannot be blank').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        var error={};
        for(key in errors){
            error[errors[key].param]=errors[key].msg;
        }
        res.writeHead(400, {'Content-Type':'application/json'});
        res.write(JSON.stringify(error));
       res.end();
    }
    else {
            controller.userBaseController.Login(req.body.username, req.body.password, function (err, result, token) {
            res.writeHead(result.statusCode, {'Content-Type': 'application/json', 'authentication': token});
            res.write(JSON.stringify(result.response));
            res.end();
        });
    }
};

var Logout = function(req, res, next) {
    req.checkHeaders('authorization',"authorization is required").notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        var error={};
        for(key in errors){
            error[errors[key].param]=errors[key].msg;
        }
        res.writeHead(400, {'Content-Type':'application/json'});
        res.write(JSON.stringify(error));
        res.end();
    }
    else {

        controller.userBaseController.Logout(req.headers.authorization, function (err, result) {
            res.writeHead(result.statusCode, {'Content-Type': 'application/json'});
            res.write(JSON.stringify(result.response));
            res.end('okay');
        });
    }
};

module.exports={
    Register:Register,
    verifyEmail:verifyEmail,
    Login:Login,
    Logout:Logout
};

