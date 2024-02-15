const express=require('express');
const router=express();
router.use(express.json());
const otpcontroller=require('../controllers/otpcontroller');
router.post('/sendotp',otpcontroller.otpGenerate);
module.exports=router;
