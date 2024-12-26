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
const mongostore=require('connect-mongo');
app.use(express.urlencoded());
app.use(cookieparser());

//setup view engine
app.set('view engine','ejs');
app.set('views','./views');

app.use(
    session({
        name: 'codeial',
        secret: 'blahsomething', // Replace with a strong secret key
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: 1000 * 60 * 100, // Session expiration time
        },
        store: mongostore.create({
            mongoUrl: 'mongodb://localhost:27017/codeial', // MongoDB connection string
            autoRemove: 'disabled',
        }),
    })
);
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