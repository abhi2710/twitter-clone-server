/**
 * Created by abhinav on 1/22/2016.
 */
var async=require('async'),
    models=require('../models'),
    DAOmanager=require('./DAOmanager');

var getToken=function(userId,callback){
    DAOmanager.getData(models.registerTokens,{userId:userId},{},function(err,document){
        if(document)
        return callback(null,document.token);
        else return callback(new Error(errors.BAD_REQUEST),null);
    });
};

var setToken=function(token,userId,callback){
    DAOmanager.setData (models.registerTokens,{token:token,userId:userId},callback);
};



module.exports={
    getToken:getToken,
    setToken:setToken
};