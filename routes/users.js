const express=require('express');
const router=express.Router();
const usercontroller=require('../controllers/users_controller');
router.get('/sign-up',usercontroller.usersignup);
router.get('/sign-in',usercontroller.usersignin);
module.exports=router;
