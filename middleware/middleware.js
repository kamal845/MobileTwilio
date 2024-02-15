const express=require('express');
const middleware1=express();
const routes=require('../routes/route');
middleware1.use('/otp',routes);
module.exports=middleware1;