/**
 * Created by abhinav on 1/15/2016.
 */
var async=require('async'),
    Jwt=require('jsonwebtoken'),
    Config = require('../Config/email'),
    nodemailer = require("nodemailer"),
    algorithm = 'aes-256-ctr',
    models=require('../models'),
    dao=require('../DAO'),
    util=require('../util'),
    privateKey = Config.key.REGISTERPRIVATEKEY,
    Constants=require('../Config'),
    errorMessages=Constants.responseMessages.ERROR_MESSAGES,
    successMessages=Constants.responseMessages.SUCCESS_MESSAGES;

var smtpTransport = nodemailer.createTransport("SMTP", {
    service: "Gmail",
    auth: {
        user: Config.email.username,
        pass: Config.email.password
    }
});

var sentMailVerificationLink = function(email,token) {
    var from = Config.email.accountName+" Team<" + Config.email.username + ">";
    var mailbody = "<p>Thanks for Registering on "+"Tweety"+" </p><p>Please verify your email by clicking on the verification link below.<br/><a href='http://"+"localhost"+":"+"8500"+"/user/"+"verifyEmail"+"/"+token+"'>Verification Link</a></p>";
    mail(from, email , "Account Verification", mailbody);
};

exports.sentMailForgotPassword = function(user,callback) {
    var from = Config.email.accountName+" Team<" + Config.email.username + ">";
    var mailbody = "<p>Your "+Config.email.accountName+"  Account Credential</p><p>username : "+user.userName+" , password : "+decrypt(user.password)+"</p>";
    mail(from, user.userName , "Account password", mailbody,function(err,response){
        console.log("forgot password "+response);
        return callback(err,response);
    });
};

function mail(from, email, subject, mailbody){
    var mailOptions = {
        from: from, // sender address
        to: email, // list of receivers
        subject: subject, // Subject line
        //text: result.price, // plaintext body
        html: mailbody  // html body
    };

    smtpTransport.sendMail(mailOptions);
    smtpTransport.close(); /// / shut down the connection pool, no more messages
}
function isAuth(recievedToken,model,callback){
    async.waterfall([
        function (callback) {
            try {
                var decode = Jwt.decode(recievedToken);
                callback(null,decode.userId)
            }
            catch (err) {
                return callback(new Error(errorMessages.INVALID_TOKEN), null);
            }
        },
        function(userId,callback)
        {
            if(model==="user") {
                dao.userDao.getAccessToken(userId,function(err,token) {
                    callback(token,userId)
                });
            }
            else if(model==="admin") {
                dao.adminDao.getAccessToken(userId,function(err,token) {
                    callback(token,userId)
                });
            }
            else
                callback(new Error(errorMessages.ACTION_NO_AUTH));
        },
        function (token,callback) {
            if(token===recievedToken) {
                callback(null,true);
            }
            else callback(new Error(errorMessages.ACTION_NO_AUTH));
        }
    ], function (err, valid) {
        return callback(null,valid);
    });
}

var verify=function(recievedToken,callback){
    async.waterfall([function (callback) {
        try{var decode = Jwt.decode(recievedToken);
            dao.userDao.getUserId(decode.username,callback);}
        catch(err) {
            return callback(new Error(errorMessages.INVALID_TOKEN))
        }
    },
        function (userId,callback) {
            dao.tokenDao.getToken(userId,function(err,token){
                callback(err,token,userId);
            });
        },
        function (token,userId,callback) {
            if (token===recievedToken) {
                dao.userDao.setUserVerified(userId,true,callback);
            }
            else callback(err,null)
        }
    ], function (err,result) {
        if(err) {
            return callback(null,util.createErrorResponseMessage(err));
        }
        else {
            result="";
            return callback(null,util.createSuccessResponseMessage(successMessages.EMAIL_VERIFIED,result));
        }
    });
};

module.exports={
    verify:verify,
    sentMailVerificationLink:sentMailVerificationLink,
    isAuth:isAuth
};