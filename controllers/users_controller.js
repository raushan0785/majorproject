const User=require('../models/user');
module.exports.usersignup=function(req,res){
    return res.render('user_sign_up',{
        title:'codeail|signup'})
    };
    


module.exports.usersignin=function(req,res){
    return res.render('user_sign_in',{
        title:'codeail|signin'})
    };
    module.exports.create = function (req, res) {
        if (req.body.password !== req.body.confirm_password) {
            return res.redirect(req.get('Referrer') || '/');

        }
    
        User.findOne({ email: req.body.email })
            .then(user => {
                if (!user) {
                    return res.redirect(req.get('Referrer') || '/');

                } else {
                    res.redirect('back');
                }
            })
            .then(() => res.redirect('/users/sign-in'))
            .catch(err => {
                console.log('Error:', err);
                return res.redirect(req.get('Referrer') || '/');

            });
    };
    
    
    

