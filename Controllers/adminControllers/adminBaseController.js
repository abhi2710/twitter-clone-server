/**
 * Created by abhinav on 2/6/2016.
 */
/**
 * Created by abhinav on 2/1/2016.
 */
var verify = require('./../verificationController'),
    passhash=require('password-hash-and-salt'),
    Jwt = require('jsonwebtoken'),
    Constants=require('../../Config'),
    dao = require('../../DAO/index'),
    util = require('../../util'),
    async = require('async'),
    key=require('../../Config/Constants'),
    privateKey = key.KEYS.REGISTERPRIVATEKEY,
    errorMessages=Constants.responseMessages.ERROR_MESSAGES,
    successMessages=Constants.responseMessages.SUCCESS_MESSAGES;

var Login=function(adminname,password,callback){
    async.waterfall([
        function(callback){
            dao.adminDao.getPassword(adminname,callback);
        },
        function(pass,callback) {
            passhash(password).verifyAgainst(pass, function(error, verified) {
                if(error)
                    callback(new Error(errorMessages.SOMETHING_WRONG));

                if(verified) {
                    dao.adminDao.getAdminIdAndScope(adminname,callback);
                }
                else
                    callback(new Error(errorMessages.INVALID_CREDENTIALS),null)
            });
        },
        function(adminId,scope,callback) {
            if(adminId) {
                var token = Jwt.sign({userId:adminId,scope:scope}, privateKey);
                dao.adminDao.setAccessToken(adminId, token, function (err) {
                    return callback(err, token);
                });
            }
            else callback(new Error(errorMessages.INVALID_ID),null);
        }
    ],function(err,token) {
        if(err) {
            return callback(null,util.createErrorResponseMessage(err));
        }
        else {
            return callback(null,util.createSuccessResponseMessage(successMessages.LOGIN_SUCCESSFULLY),token);
        }
    });
};
var Logout=function(token,callback){
    verify.isAuth(token,'admin',function(err,isAuthorized) {
        if (isAuthorized) {
            dao.adminDao.setAccessToken((Jwt.decode(token)).userId,0,function(err){
                if(err) {
                    console.log(err);
                    return callback(null,util.createErrorResponseMessage(err));
                }
                else {
                    return callback(null,util.createSuccessResponseMessage(successMessages.LOGOUT_SUCCESSFULLY));
                }
            });
        }
        else
            callback(new Error(errorMessages.ACTION_NO_AUTH), null);
    });
};
var register=function(payload,callback) {

    var admin = {
        adminname: payload.adminname,
        email: payload.email,
        firstname: payload.firstname,
        lastname: payload.lastname,
        phone: payload.phone,
        scope: payload.scope
    };
    async.waterfall([function (callback) {
        passhash(payload.password).hash(function(err,hash){
            admin.password=hash;
            dao.adminDao.addAdmin(admin, callback);
        });
    }], function (err) {
        if (err) {
            console.log(err);
            return callback(null, util.createErrorResponseMessage(err));
        }
        else
            return callback(null, util.createSuccessResponseMessage(successMessages.REGISTRATION_SUCCESSFUL));
    });
};
module.exports={
    Login:Login,
    Logout:Logout,
    register:register
};