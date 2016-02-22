/**
 * Created by abhinav on 2/1/2016.
 */
var models=require('../models'),
    DAOmanager=require('./DAOmanager');
var addAdmin=function(admin,callback){
    DAOmanager.setData (models.admins,admin,callback);
};

var getAdminId=function(adminname,callback) {
    DAOmanager.getData(models.admins,{adminname:adminname},{},{},function(err,doc) {
        if (err) {
            callback(err);
        }
        callback(null, doc._id);
    });
};

var getPassword=function(adminname,callback){
    DAOmanager.getData(models.admins,{adminname:adminname},{},function(err,document){
        if(document)
        return callback(err,document.password);
        else
        return callback(err,null);
    });
};

var getPasswordbyId=function(adminId,callback){
    DAOmanager.getData(models.admins,{_id:adminId},{},function(err,document){
        return callback(err,document.password);
    });
};

var getAccessToken=function(adminId,callback){
    DAOmanager.getData(models.admins,{_id:adminId},{},function(err,document) {
        if(document)
        return callback(err, document.accessToken);
        else return callback(err);
    });
};

var setUserDetails=function(adminId,data,callback) {
    DAOmanager.update(models.admins,{_id:adminId},{$set:data},{},function(err,result) {
        return callback(err,result);
    });
};

var setAccessToken=function(adminId,token,callback) {
    DAOmanager.update(models.admins, {_id: adminId}, {accessToken:token},{},callback);
};

var setUserVerified=function(adminId,valid,callback){
    DAOmanager.update(models.admins,{_id:adminId},{isVerified:valid},{},callback);
};

var getAdminIdAndScope=function(adminname,callback){
    DAOmanager.getData(models.admins, {adminname:adminname}, {}, function (err, document) {
        if(document)
            return callback(err,document._id,document.scope);
        else return callback(err,null);
    });
};

var getAdminname=function(userId,callback){
    DAOmanager.getData(models.users, {_id:adminId}, {}, function (err, document) {
        if(document)
            return callback(err,document.adminname);
        else return callback(err,null);
    });
};

var getUsers=function(callback) {
    DAOmanager.getallData(models.users,{}, {}, {}, function (err, data) {
        if(data) {
            var users=[];
            for(key in data) {
                users.push(data[key].username);
            }
            return callback(err,users);
        }
        else
            return callback(err,data);
    });
};

module.exports={
    getPassword:getPassword,
    getPasswordbyId:getPasswordbyId,
    getAdminIdAndScope:getAdminIdAndScope,
    getAdminname:getAdminname,
    getUsers:getUsers,
    getAccessToken:getAccessToken,
    setAccessToken:setAccessToken,
    setUserDetails:setUserDetails,
    addAdmin:addAdmin,
    getAdminId:getAdminId
};