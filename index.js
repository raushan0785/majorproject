const express=require('express');
const cookieparser=require('cookie-parser');
const app=express();
const port=8000;
app.use(express.urlencoded());
app.use(cookieparser());
//use express router
app.use('/',require('./routes/index'));
app.use('/',require('./routes/users'));
//setup view engine
app.set('view engine','ejs');
app.set('views','./views');
app.listen(port,function(err){
    if(err){
        console.log('error',err);
    }
    console.log('server is running on port',port);
});