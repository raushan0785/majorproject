module.exports.home=function(req,res){
    // Converts to a regular object
    console.log(req.cookies);
   return res.render('home',{
    title:"home"
   });
    

}