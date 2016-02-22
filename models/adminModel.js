/**
 * Created by abhinav on 2/1/2016.
 */
var mongoose=require('mongoose');
var adminSchema=new mongoose.Schema({
    adminname:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    firstname:{type:String,required:true},
    lastname:{type:String,required:true},
    password:{type:String,required:true},
    phone:{type:Number,required:true},
    accessToken:{type:String,default:0},
    scope:{type:String}
});
module.exports=mongoose.model("admins",adminSchema);

