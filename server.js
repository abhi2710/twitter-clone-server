'use strict';
var Routes = require('./routes'),
    mongoose=require('mongoose'),
    express = require('express'),
    app = express(),
    routes=require('./routes'),
    expressValidator = require('express-validator'),
    bodyparser=require('body-parser');

app.use(bodyparser.urlencoded({ extended: true }));
app.use(expressValidator());
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

app.listen(3000);
app.get('/', function(req, res) {
    res.send('hello world');
});

app.post('/user/login',routes.userRegisterRoute.Login);
app.post('/user/register',routes.userRegisterRoute.Register);
app.delete('/user/logout',routes.userRegisterRoute.Logout);
app.get('/user/verifyEmail',routes.userRegisterRoute.verifyEmail);

app.put('/user/editprofile',routes.homeRoute.editProfile);
app.post('/user/home',routes.homeRoute.home);
app.post('/user/uploadprofilepic',routes.homeRoute.uploadProfilePic);

app.post('/admin/login',routes.adminRegisterRoute.adminLogin);
app.post('/admin/register',routes.adminRegisterRoute.adminRegister);
app.delete('/admin/logout',routes.adminRegisterRoute.adminLogout);

app.put('/admin/editUserProfile',routes.adminhomeRoute.editUserProfile);
app.post('/admin/home',routes.adminhomeRoute.adminhome);


app.post('/admin/showusersonmap',routes.adminhomeRoute.showusersonmap);

mongoose.connect('mongodb://localhost/Tweetydb');
mongoose.connection.once('connected', function() {
    console.log("Connected to database Tweetydb")
});
