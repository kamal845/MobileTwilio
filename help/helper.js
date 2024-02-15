const express=require('express');
  var otpVerification = async (otpTime) => {
        try {
          console.log("Milliseconds is" + otpTime);
          var cData = new Date();
          differenceValue = (otpTime - cData.getTime()) / 1000;
          differenceValue /= 60;
          const minutes = Math.abs(differenceValue);
          console.log("Expired minutes" + minutes);
          if (minutes > 2) {
            return true;
          } 
            return false;
        } catch (error) {
            return false;
        }
      }
module.exports=otpVerification;