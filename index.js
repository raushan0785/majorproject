const express=require('express');
const cookieparser=require('cookie-parser');
const app=express();
const port=8000;
const db=require('./config/mongoose');
//used for session cookie
const session=require('express-session');
const Passport=require('passport');
const PassportLocal=require('./config/passport-local-strategy');
const passport = require('passport');
app.use(express.urlencoded());
app.use(cookieparser());

//setup view engine
app.set('view engine','ejs');
app.set('views','./views');
app.use(session({
    name:'codeial',
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxage:(1000*60*100)
    }
}));
app.use(Passport.initialize());
app.use(Passport.session());
app.use(passport.setAuthenticateduser);
app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));
app.listen(port,function(err){
    if(err){
        console.log('error',err);
    }
    console.log('server is running on port',port);
});