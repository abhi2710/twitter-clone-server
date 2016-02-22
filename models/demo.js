/**
 * Created by abhinav on 2/9/2016.
 */
var mongoose = require('mongoose');
require('mongoose-type-url');

var EmployerSchema=new mongoose.Schema({
    name:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    phone:{type:Number,required:true},
    hasPosted:[{type:mongoose.Schema.Types.ObjectId,ref:'job'}],
    industry:{type:String,enum:['IT/SOFTWARE','SALES/MARKETING','WRITING/CONTENT','DESIGN/ARCHITECTURE'],required:true},
    OrganizationSize:{type:Number},
    Description:{type:String},
    location: {
        'type': {
            type: String,
            required: true,
            enum: ['Point', 'LineString', 'Polygon'],
            default: 'Point'
        },
        coordinates: [Number]
    },
    WebsiteLink:{type:mongoose.SchemaTypes.Url},
    isVerified:{type:Boolean,required:true,default:false},
    isDeleted:{type:Boolean,required:true,default:false},
    accessToken:{type:String,default:0}
});