var mongoose = require('mongoose');
require('mongoose-type-url');
var JobSchema=new mongoose.Schema({title:{type:String,required:true,unique:true},
    industry:{type:String,enum:['IT/SOFTWARE','SALES/MARKETING','WRITING/CONTENT','DESIGN/ARCHITECTURE'],required:true},
    Description:{type:String},
    employer:{type:mongoose.Schema.Types.ObjectId,ref:'employer'},
    postedOn:{type:Date,required:true},
    minEducation:{type:String,enum:['graduation','post-graduation','class-12']},
    status:{type:String,enum:['Completed','Cancelled','Processing','Available']},
    wage:{
        type:{type:String,enum:['Fixed','Range'],required:true},
        Range:{
            from:{type:Number},
            to:{type:Number}
        }
    },
    duration:{
        reporting:{type:Date},
        completion:{type:Date}
    },
    experience:{
        from:{type:Date},
        to:{type:Date}
    },
    skills:{type:String},
    location: {
        'type': {
            type: String,
            required: true,
            enum: ['Point', 'LineString', 'Polygon'],
            default: 'Point'},
        coordinates: [Number]
    },
    dressCode:{type:String,enum:['Casuals','Formals','Semi-formals']},
    isDeleted:{type:Boolean,required:true,default:false}
});