/**
 * Created by abhinav on 2/1/2016.
 */
var Joi=require('joi'),
    controller = require('../../Controllers/index');
var adminRegister = function(req, res, next) {
    req.assert('adminname', 'adminname cannot be blank').notEmpty();
    req.assert('password', 'Password cannot be blank').notEmpty();
    req.assert('email', 'email cannot be blank').notEmpty();
    req.assert('email', 'email is not valid').isEmail();
    req.assert('firstname', 'firstname cannot be blank').notEmpty();
    req.assert('lastname', 'lastname cannot be blank').notEmpty();
    req.assert('phone', 'Phone number cannot be blank').notEmpty();
    req.assert('scope', 'valid choices are: superAdmin,admin').notEmpty();

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
        controller.adminBaseController.register(req.body,function(err,result) {
            res.writeHead(result.statusCode, {'Content-Type': 'application/json'});
            res.write(JSON.stringify(result.response));
            res.end();
        });
    }
};

var adminLogin = function(req, res, next) {
    req.assert('adminname', 'adminname cannot be blank').notEmpty();
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
        controller.adminBaseController.Login(req.body.adminname,
            req.body.password,function(err,result,token){
            res.writeHead(result.statusCode, {'Content-Type': 'application/json','authorization':token});
            res.write(JSON.stringify(result.response));
            res.end();
        });
    }
};


var adminLogout = function(req, res, next) {
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
        controller.adminBaseController.Logout(req.headers.authorization,function(err,result){
                res.writeHead(result.statusCode, {'Content-Type': 'application/json'});
                res.write(JSON.stringify(result.response));
                res.end();
            });
    }
};



module.exports={
    adminLogin:adminLogin,
    adminRegister:adminRegister,
    adminLogout:adminLogout
};

