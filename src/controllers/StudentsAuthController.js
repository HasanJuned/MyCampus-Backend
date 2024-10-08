const StudentsAuthModel = require("../models/StudentsAuthModel")
const jwt = require("jsonwebtoken")
const OtpModel = require("../models/OtpModel")
const TaskModel = require("../models/TeacherTaskModel")
const SendEmailUtility = require("../utility/SendEmailUtility");
const TeachersAuthModel = require("../models/TeachersAuthModel");

exports.Registration=async (req,res)=>{

    let reqBody = req.body;
    try{
        let result = await StudentsAuthModel.create(reqBody);
        res.status(200).json({status: "success", data: result})

    }catch(e){
        res.status(200).json({status: "fail", data: e.toString()})
    }

}

exports.Login=async (req,res)=>{

    let reqBody = req.params;


    try{
        let result = await StudentsAuthModel.find(reqBody).count();
        if(result===1){
            let Payload = {
                exp:Math.floor(Date.now()/1000)+(24*60*60),
                data: reqBody['studentId']
            }

            let token = jwt.sign(Payload, 'SecretKey123456789');
            let email = req.headers['email'];
            let result2 = await StudentsAuthModel.find(reqBody);
            res.status(200).json({status: "success", data: result2, token: token})


        }else{
            res.status(200).json({status: "fail", data: "No user found. Try again!"})
        }

    }catch(e){
        res.status(200).json({status: "fail", data: "Something went wrong"})
    }

}

exports.AvailityCheckStudents = async (req, res) => {
    try {
        let studentId = req.params.studentId;
        let student = await StudentsAuthModel.findOne({ studentId: studentId });

        if (student) {
            // Email found, return success
            res.status(200).json({ status: "success", message: "Student found", data: student });
        } else {
            // Email not found, return specific message
            res.status(404).json({ status: "fail", message: "No student found with this id" });
        }

    } catch (e) {
        // Error handling
        res.status(500).json({ status: "error", message: "Server error, please try again" });
    }
};


  exports.ProfileUpdate = async (req, res) => {
    try {
      //let email = req.headers['email'];
      let studentIdd = req.headers['studentId'];
      let reqBody = req.body;
      let result = await StudentsAuthModel.updateOne({ studentId: studentIdd }, reqBody);
      res.status(200).json({ status: 'success', data: result });
    } catch (e) {
      console.error(e);
      return res.status(200).json({ status: 'fail', data: 'Internal Server Error' });
    }
  };

  exports.RecoverVerifyEmail= async(req,res)=>{

    let email = req.params.email;
    let OtpCode = Math.floor(100000 + Math.random() * 900000)
    let EmailText = "Your Verification Code is: "+OtpCode;
    let EmailSubject = "Task Manager Verification Code"

    let result = await StudentsAuthModel.find({email:email}).count();

    if(result===1){
        await SendEmailUtility(email, EmailText, EmailSubject);
        let result = await OtpModel.create({email:email, otp: OtpCode})
        res.status(200).json({status: "success", data: "A 6 digit OTP code sent to your email"})


    }else{
        res.status(200).json({status: "fail", data: "No user found. Try again!"})
    }

  }

  exports.RecoverVerifyOtp=async(req,res)=>{
    let email = req.params.email;
    let OtpCode = req.params.otp
    let status = 0;
    let updateStatus = 1;

    let result = await OtpModel.find({email:email, otp: OtpCode, status:status}).count();

    if(result===1){

        let result = await OtpModel.updateOne({email:email, otp: OtpCode, status:status}, {status:updateStatus});
        res.status(200).json({status: "success", data: "Otp Verified"})


    }else{
        res.status(200).json({status: "fail", data: "Invalid Otp"})
    }

  }
  
  exports.RecoverResetPassword=async(req,res)=>{
    let email = req.body['email'];
    let OtpCode = req.body['OTP'];
    let newPass = req.body['password']
    let updateStatus = 1;

    let result = await OtpModel.find({email:email, otp: OtpCode, status:updateStatus}).count();

    if(result===1){

        let result = await StudentsAuthModel.updateOne({email:email}, {password: newPass});
        res.status(200).json({status: "success", data: "Password Reset Success"})


    }else{
        res.status(200).json({status: "fail", data: "Password reset failed"})
    }

  }