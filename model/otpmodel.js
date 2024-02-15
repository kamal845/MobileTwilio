const mongoose=require('mongoose');
const otpschema=mongoose.Schema({
    phoneNumber:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
otpExpiration:{
    type:Date,
    default:Date.now(),
    get:(otpExpiration)=>otpExpiration.getTime(),
    //isme milliseconds bhi get hojati hai issliye iska use kiya hai.
    set:(otpExpiration)=>new Date(otpExpiration)
}
})
const otpModel=mongoose.model('otp',otpschema);
module.exports=otpModel;