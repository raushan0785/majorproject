const express=require('express');
const router=express.Router();
const usercontroller=require('../controllers/users_controller');
router.get('/profile', usercontroller.profile);
router.get('/sign-up',usercontroller.usersignup);
router.get('/sign-in',usercontroller.usersignin);
router.post('/create',usercontroller.create);
router.post('/create-session',usercontroller.createsession);
module.exports=router;
