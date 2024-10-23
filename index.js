const express=require('express');
const cookieparser=require('cookie-parser')
const app=express();
const port=8000;
const db=require('./config/mongoose');
app.use(express.urlencoded());
app.use(cookieparser());
app.use('/',require('./routes/index.js'));
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
    if(err){
        console.log(`error:${err}`);
    }
    console.log(`server is running on port:${port}`);
});