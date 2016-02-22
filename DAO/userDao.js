var models=require('../models'),
    DAOmanager=require('./DAOmanager'),
    Constants=require('../Config'),
    errorMessages=Constants.responseMessages.ERROR_MESSAGES;

var getPassword=function(username,callback){
    DAOmanager.getData(models.users,{username:username},{},function(err,document){
        if(document.isVerified)
        return callback(err,document.password);
        else
         return callback(new Error(errorMessages.USER_NOT_VERIFIED),null);
    });
};

var getPasswordbyId=function(userId,callback){
    DAOmanager.getData(models.users,{_id:userId},{},function(err,document){
        return callback(err,document.password);
    });
};

var getAccessToken=function(userId,callback){
    DAOmanager.getData(models.users,{_id:userId},{},function(err,document) {
        if(document.isVerified)
        return callback(err, document.accessToken);
        else
        return callback(new Error(errorMessages.USER_NOT_VERIFIED));
    });
};

var setUserDetails=function(userId,data,callback) {
DAOmanager.update(models.users,{_id:userId},{$set:data},{},function(err,result) {
    return callback(err,result);
});
};

var setAccessToken=function(userId,token,callback) {
    DAOmanager.update(models.users, {_id: userId}, {accessToken:token},{},callback);
};

var setUserVerified=function(userId,valid,callback){
    DAOmanager.update(models.users,{_id:userId},{isVerified:valid},{},callback);
};

var isRegistered=function(username,callback) {
    DAOmanager.getData(models.users, {username:username}, {}, function (err, document) {
        return callback(err, document.isVerified);
    });
};

var getUserId=function(username,callback){
    DAOmanager.getData(models.users, {username:username}, {}, function (err, document) {
        if(document)
            return callback(err,document._id);
        else return callback(err,null);
});
};

var getUsername=function(userId,callback){
    DAOmanager.getData(models.users, {_id:userId}, {}, function (err, document) {
        if(document)
            return callback(err,document.username);
        else return callback(err,null);
    });
};

var addUser=function(user,callback){
    DAOmanager.setData (models.users,user,callback);
};

var getFollowers=function(userId,callback) {
    DAOmanager.getDataWithReference(models.users,{_id:userId},{}, {},{
        path: 'followers',
        select: 'username firstname lastname',
        options: {lean:true}
    },function (err,data) {
        if (err) return console.error(err);
        var FollowersArr=[];
        var key=0;
        var len=data[key].followers.length;
        for (var i = 0; i < len; i++) {
            var follower = {};
            follower['username']=data[key].followers[i].username;
            follower['firstname']=data[key].followers[i].firstname;
            follower['lastname']=data[key].followers[i].lastname;
            FollowersArr.push(follower);
        }
        return callback(err,FollowersArr);
    });
};

var getFollowing=function(userId,callback) {
    DAOmanager.getDataWithReference(models.users,{_id:userId},{}, {},{
        path: 'following',
        select: 'username firstname lastname',
        options: {lean:true}
    },function (err,data) {
        if (err) return console.error(err);
        var FollowingArr=[];
        var key=0;
        var len=data[key].following.length;
        for (var i = 0; i < len; i++) {
            var following = {};
            following['username']=data[key].following[i].username;
            following['firstname']=data[key].following[i].firstname;
            following['lastname']=data[key].following[i].lastname;
            FollowingArr.push(following);
        }
        return callback(err,FollowingArr);
    });
};

var getFollowersId=function(userId,callback){
    DAOmanager.getData(models.users, {_id:userId}, {}, {}, function (err, data) {
        if(data)
            return callback(err, data.followers);
        else
            return callback(err,data);
    });
};

var getFollowingId=function(userId,callback) {
    DAOmanager.getData(models.users, {_id:userId}, {}, {}, function (err, data) {
        if(data)
            return callback(err, data.following);
        else
            return callback(err,data);
    });
};

var getNearbyUsers=function(radius,lat,long,callback) {
    DAOmanager.getallData(models.users,{location:{
        $geoWithin : { $centerSphere :
        [ [lat,long ] ,radius/3963.2 ]
    }}},{},{},function (err, data) {
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

var getUsers=function(callback) {
    DAOmanager.getallData(models.users,{}, {}, {}, function (err, data) {
        if(data) {
            var users=[];
            for(key in data) {
                var user={};
                user['username']=data[key].username;
                user['location']=data[key].location.coordinates;
                users.push(user);
            }
            return callback(err,users);
        }
        else
            return callback(err,data);
    });
};

var getUser=function(username,callback){
    DAOmanager.getData(models.users, {username:username}, {accessToken:0,password:0},{}, function (err, document) {
        return callback(err,document);
    });
};


var addtoFollowing=function(userId,followUserId,callback) {
    DAOmanager.update(models.users,{_id:userId},{$addToSet:{following:followUserId}},{},function(err,data){
        return callback(err,data.nModified);
    });
};

var addtoFollowers=function(userId,followUserId,callback) {
    DAOmanager.update(models.users,{_id:followUserId},{$addToSet:{followers:userId}},{},function(err,data){
        return callback(err,data.nModified);
    });
};

var removefromFollowers=function(userId,followUserId,callback) {
    DAOmanager.update(models.users,{_id:followUserId},{$pull:{followers:userId}},{},function(err,data){
        return callback(err,data.nModified);
    });
};

var removefromFollowing=function(userId,followUserId,callback) {
    DAOmanager.update(models.users,{_id:userId},{$pull:{following:followUserId}},{},function(err,data){
        return callback(err,data.nModified);
    });
};

var removefromFollowingofothers=function(UserId,callback) {
    var user=[UserId];
    DAOmanager.update(models.users,{following:{$in:user}},{$pull:{following:UserId}},{multi:true},function(err,data){
        return callback(err,data);
    });
};

var removefromFollowersofothers=function(UserId,callback) {
    var user=[UserId];
    DAOmanager.update(models.users,{followers:{$in:user}},{$pull:{followers:UserId}},{multi:true},function(err,data){
        return callback(err,data);
    });
};

var deleteUser=function(username,callback){
    DAOmanager.update(models.users,{username:username},{$set:{isDeleted:true}},{},function(err,data){
        return callback(err,data.nModified);
    });
};

module.exports={
    getPassword:getPassword,
    getPasswordbyId:getPasswordbyId,
    getUserId:getUserId,
    getUsername:getUsername,
    getFollowers:getFollowers,
    getFollowing:getFollowing,
    getFollowingId:getFollowingId,
    getFollowersId:getFollowersId,
    getUsers:getUsers,
    getAccessToken:getAccessToken,
    setAccessToken:setAccessToken,
    setUserVerified:setUserVerified,
    setUserDetails:setUserDetails,
    addUser:addUser,
    addtoFollowers:addtoFollowers,
    addtoFollowing:addtoFollowing,
    removefromFollowers:removefromFollowers,
    removefromFollowing:removefromFollowing,
    removefromFollowingofothers:removefromFollowingofothers,
    removefromFollowersofothers:removefromFollowersofothers,
    isRegistered:isRegistered,
    getUser:getUser,
    getNearbyUsers:getNearbyUsers,
    deleteUser:deleteUser
};