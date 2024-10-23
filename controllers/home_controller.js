module.exports.home=function(req,res){
    //res.end('<h1>exprerss</h1> <a href="C:\Users\Lenovo\Pictures\Screenshots\Screenshot 2024-07-27 222425.png">');
    return res.render('home',{
        title:"home"
    });
}