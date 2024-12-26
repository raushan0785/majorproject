const User=require('../models/user');
module.exports.usersignup=function(req,res){
    if(req.isAuthenticated()){
    return res.redirect('/users/profile');
        
    }
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    });
}
    
    module.exports.profile = function(req, res){
        return res.render('user_profile', {
            title: 'User Profile'
        })
    }

module.exports.usersignin=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: "Codeial | Sign in"
    });
    
    
    }
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
    module.exports.createsession = function (req, res) {
        // Check if res object exists and has the redirect method
      
            return res.redirect('/users/profile');
       
    };
    
    
    
    

