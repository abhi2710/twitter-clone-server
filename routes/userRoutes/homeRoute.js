/**
 * Created by abhinav on 1/25/2016.
 */
var Joi=require('joi'),
    controller = require('../../Controllers/index'),
    multiparty=require('multiparty');

var home = function(req, res, next) {
    req.checkHeaders('authorization',"authorization is required").notEmpty();
    if(req.body.username)
        req.assert('username', 'username needs to be alphanumeric').isAlpha();
    req.assert('option','valid options are :Post Tweet,Tweets,Followers,Following,Users,Follow,Unfollow,Re-Tweet,like tweet,unlike tweet').notEmpty();

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
        controller.userCRUDController.display(req.headers.authorization,req.body.option,req.body.tweet,
            req.body.username,function(err,result)  {
                res.writeHead(result.statusCode, {'Content-Type':'application/json'});
                res.write(JSON.stringify(result.response));
                res.end();
            });
    }
};

var editProfile = function(req, res, next) {
    req.checkHeaders('authorization',"authorization is required").notEmpty();
    if(req.body.username)
        req.assert('username', 'username needs to be alphanumeric').isAlpha();
    req.assert('oldpassword', 'Password cannot be blank').notEmpty();
    if(req.body.email)
        req.assert('email', 'email is not valid').isEmail();

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
        controller.userBaseController.editProfile(req.headers.authorization, req.body,
            function (err, result)  {
                res.writeHead(result.statusCode, {'Content-Type': 'application/json'});
                res.write(JSON.stringify(result.response));
                res.end();
            });
    }
};

var uploadProfilePic = function(req, res, next) {
    req.checkHeaders('authorization',"authorization is required").notEmpty();
    req.assert('file', 'file needed').notEmpty();
    var errors = req.validationErrors();
    /*if (errors) {
     var error={};
     for(key in errors){
     error[errors[key].param]=errors[key].msg;
     }
     res.writeHead(400, {'Content-Type':'application/json'});
     res.write(JSON.stringify(error));
     res.end();
     }
     else {*/

    var form = new multiparty.Form();
    form.parse(req, function(err, fields, files) {
            controller.userCRUDController.uploadProfilePic(req.headers.authorization,files['file'],
                function (err, result) {
                    res.writeHead(result.statusCode, {'Content-Type':'application/json'});
                    res.write(JSON.stringify(result.response));
                    res.end();
                });
    });
};

module.exports={
    home:home,
    editProfile:editProfile,
    uploadProfilePic:uploadProfilePic
};
