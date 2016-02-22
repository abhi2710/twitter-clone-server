/**
 * Created by abhinav on 2/6/2016.
 */
var mongoose=require('mongoose');
var registerTokenSchema=new mongoose.Schema({
    userId:{type:mongoose.Schema.ObjectId,required:true,unique:true,ref:'users'},
    token:{type:String,required:true}
});
module.exports=mongoose.model("registerTokens",registerTokenSchema);