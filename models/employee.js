/**
 * Created by abhinav on 2/9/2016.
 */
var mongoose = require('mongoose');
require('mongoose-type-url');

var EmployeeSchema=new mongoose.Schema({
    email:{type:String,required:true,unique:true},
    name:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    phone:{type:Number,required:true},
    avgRating:{type:Number,enum:['1','2','3','4','5']},
    review:[{
        postedBy:{type:mongoose.Schema.Types.ObjectId,ref:'employer'},
        rating:{type:Number,enum:['1','2','3','4','5']},
        description:{type:String}
    }],
    isLookingForJob:{type:Boolean,default:true},
    industry:{type:String,required:true},
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