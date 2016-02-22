/**
 * Created by abhinav on 1/25/2016.
 */
var models=require('../models'),
    DAOmanager=require('../DAO/DAOmanager');

var likeTweet=function(tweetId,userId,callback) {
    DAOmanager.update(models.tweet,{_id:tweetId},{$addToSet:{likes:userId}},{},function (err,doc) {
        return callback(err);
    });
};

var unlikeTweet=function(tweetId,userId,callback) {
    DAOmanager.update(models.tweet,{_id:tweetId},{$pull:{likes:userId}},{},function (err,doc) {
        return callback(err);
    });
};

var addTweet=function(userId,data,callback) {
    DAOmanager.setData(models.tweet,data,function (err,doc) {
        return callback(err,doc.tweet_text);
    });
};

var addReTweet=function(userId,tweet_id,callback) {
    DAOmanager.findOneAndUpdateData(models.tweet,{_id:tweet_id},{$addToSet:{retweetedBy:userId}},{},function (err,doc) {
        return callback(err,doc.tweet_text);
    });
};

var deleteTweet=function(tweet_id,callback) {
    DAOmanager.update(models.tweet,{_id:tweet_id},{$set:{isDeleted:true}},{},function (err,doc) {
        return callback(err,doc.tweet_text);
    });
};
//
//var getUserTweets=function(userId,callback) {
//    DAOmanager.getallData(models.tweet, {userId:userId},{}, {},function (err,data) {
//        if (err) return console.error(err);
//        var tweetsArr=[];
//        for(key in data) {
//            var tweet={};
//            tweet['tweet']=data[key].tweet_text;
//            tweet['time']=data[key].time;
//            tweet['isDeleted']=data[key].isDeleted;
//            tweet['likes']=data[key].likes;
//            tweetsArr.push(tweet);
//        }
//        return callback(err,tweetsArr);
//    });
//};

var getTweet=function(tweet_id,callback) {
    DAOmanager.getData(models.tweet, {_id:tweet_id},{}, {},function (err,data) {
        if (data)
        return callback(err,data.tweet_text,data.userId);
        else return callback(err);
    });
};


var getTweets=function(followers,callback) {
    DAOmanager.getDataWithReference(models.tweet, {userId:{$in:followers}},{}, {}, {
        path: 'userId retweetedfrom',
        select: 'username firstname lastname',
        // match:{'isDeleted':"false"},
        options: {lean: true, sort: {time: -1}}
    },function (err,data) {
        if (err) return console.error(err);
        var tweetsArr = [];
        for (key in data) {
            var tweet = {};
            tweet['username'] = data[key].userId.username;
            tweet['firstname'] = data[key].userId.firstname;
            tweet['lastname'] = data[key].userId.lastname;
            tweet['tweet'] = data[key].tweet_text;
            tweet['time'] = data[key].time;
            tweet['likes']=data[key].likes;
            if (data[key].retweetedfrom) {
                tweet['Retweetedfrom'] = data[key].retweetedfrom.username;
            }
            tweetsArr.push(tweet)
        }
        if (err) return console.error(err);
        return callback(err,tweetsArr);
    });
};



module.exports={
    addTweet:addTweet,
    addReTweet:addReTweet,
    likeTweet:likeTweet,
    unlikeTweet:unlikeTweet,
    getTweets:getTweets,
    getTweet:getTweet,
    deleteTweet:deleteTweet
};
