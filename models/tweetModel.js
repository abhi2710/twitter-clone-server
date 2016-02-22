/**
 * Created by abhinav on 1/25/2016.
 */
var mongoose=require('mongoose');
var tweetSchema=new mongoose.Schema({
    userId:{type:mongoose.Schema.ObjectId,required:true,ref:'users'},
    tweet_text:{type:String,required:true},
    time:{type:Date,required:true,default:new Date()},
    isDeleted:{type:Boolean,deafult:false},
    likes:[{type:mongoose.Schema.ObjectId,ref:'users'}],
    retweetedBy:[{ type: mongoose.Schema.Types.ObjectId,ref:'users'}],
    retweetedfrom:{type:mongoose.Schema.ObjectId,ref:'users'}
});
module.exports=mongoose.model("tweet",tweetSchema);

