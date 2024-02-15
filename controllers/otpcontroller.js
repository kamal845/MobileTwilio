const express = require("express");
require("dotenv").config();
const bodyParser = require('body-parser');
const otpModel = require("../model/otpmodel");
const otpGenerator = require('otp-generator');
const twilio = require("twilio");
const otpVerification= require("../help/helper");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = twilio(accountSid, authToken);
module.exports = {
  otpGenerate: async (req, res) => {
    try {
      const { phoneNumber } = req.body;
      const otp = otpGenerator.generate(6, {});
      //{upperCaseAlphabets:false }.{specialChars:false} 6 ka matlab otp six digit ka hoga.automatically sabhi{} true hote hai.
      //uppar wale {} mai jo bhi letter honge waise uppercase nahi rakhne ya lowercase nahi rakhne uske liye hota hai}
      //sirf digit ke liye
    //   const otp = otpGenerator.generate(6, {
    //       upperCaseAlphabets: false,
    //       lowerCaseAlphabets: false,
    //       specialChars: false,
    //       digits: true
    //   });
      const cDate = new Date();
      await otpModel.findOneAndUpdate(
        // {phoneNumber:phoneNumber}
        { phoneNumber },
        { otp, otpExpiration: new Date(cDate.getTime()) },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      //phone par otp ayega
       twilioClient.messages.create({
        body: `your otp is${otp}`,
        to: phoneNumber,
        from: process.env.TWILIO_PHONE_NUMBER,
      });
      return res.status(200).json({
        status: "success",
        message: "otp successfully generated!!",
        data: otp,
      });
    } catch (error) {
      console.log("error");
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
        error: error.message,
      });
    }
  },
 verifyotp :async (req, res) => {
    try {
        const { phoneNumber, otp } = req.body;

        const otpData = await otpModel.findOne({
            phoneNumber,
            otp,
        });

        if (!otpData) {
            return res.status(400).json({
                status: false,
                message: "Incorrect OTP! Please try again.",
            });
        }

        const isOtpExpired = await otpVerification(otpData.otpExpiration);

        if (isOtpExpired) {
            return res.status(400).json({
                status: false,
                message: "OTP has expired! Please request a new one.",
            });
        }

        return res.status(200).json({
            status: true,
            message: "OTP successfully verified!",
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
        });
    }
}
};
