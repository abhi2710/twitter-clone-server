var async=require('async');
var arr=[[1,2],[3,4]];
var sum=[];
async.forEach(arr,function(item,callback) {
    console.log(item);
});