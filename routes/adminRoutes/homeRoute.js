/**
 * Created by abhinav on 2/5/2016.
 */
var Joi=require('joi'),
    controller = require('../../Controllers/index');

var adminhome = function(req, res, next) {
    req.checkHeaders('authorization',"authorization is required").notEmpty();
    req.assert('Action','valid options are: show nearby users,Show Users,Delete User,Show User Profile,Delete Tweet,Show Tweets of a User').notEmpty()
    if(req.body.email)
        req.assert('email','email is not valid').isEmail();

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
        controller.CRUDController.display(req.headers.authorization,req.body.Action,req.body.username,req.body.tweetId,
            req.body.radius,req.body.latitude,req.body.longitude,
            function(err,result){
                res.writeHead(result.statusCode, {'Content-Type': 'application/json'});
                res.write(JSON.stringify(result.response));
                res.end();
            });
    }
};

var editUserProfile = function(req, res, next) {
    req.checkHeaders('authorization',"authorization is required").notEmpty();
    if(req.body.email)
        req.assert('email','email is not valid').isEmail();

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
        controller.CRUDController.editUserProfile(req.headers.authorization,req.body.username,
            req.body,function(err,result){
                res.writeHead(result.statusCode, {'Content-Type': 'application/json'});
                res.write(JSON.stringify(result.response));
                res.end();
            });
    }
};

var showusersonmap = function(req, res, next) {
    req.checkHeaders('authorization',"authorization is required").notEmpty();
    if(req.body.email)
        req.assert('email','email is not valid').isEmail();

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
        controller.CRUDController.showUsers(req.headers.authorization,function(err,result){
        //    res.writeHead(result.statusCode, {'Content-Type': 'application/json'});
         //   res.write(JSON.stringify(result.response));
            res.render('signin.html');
            res.end();
        });
    }
};

module.exports={
    adminhome:adminhome,
    editUserProfile:editUserProfile,
    showusersonmap:showusersonmap
};
