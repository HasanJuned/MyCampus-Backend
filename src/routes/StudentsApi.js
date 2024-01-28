const express = require("express");
const router = express.Router();
const StudentsAuthController = require('../controllers/StudentsAuthController')
const StudentAuthVerifyMiddleWare=require("../middleWare/StudentAuthVerifyMiddleWare");
const TasksController = require('../controllers/TaskController')

router.post('/Registration', StudentsAuthController.Registration)
router.post('/Login', StudentsAuthController.Login)
router.get('/ProfileDetails', StudentAuthVerifyMiddleWare, StudentsAuthController.ProfileDetails)
router.post('/ProfileUpdate', StudentAuthVerifyMiddleWare, StudentsAuthController.ProfileUpdate)
router.get("/RecoverVerifyEmail/:email",StudentsAuthController.RecoverVerifyEmail);
router.get("/RecoverVerifyOTP/:email/:otp",StudentsAuthController.RecoverVerifyOtp);
router.post("/RecoverResetPassword",StudentsAuthController.RecoverResetPassword);


router.post("/createTask",StudentAuthVerifyMiddleWare,TasksController.createTask);
router.get("/deleteTask/:id",StudentAuthVerifyMiddleWare,TasksController.deleteTask);
router.get("/updateTaskStatus/:id/:status",StudentAuthVerifyMiddleWare,TasksController.updateTaskStatus);
router.get("/listTaskByStatus/:status",StudentAuthVerifyMiddleWare,TasksController.listTaskByStatus);
router.get("/taskStatusCount",StudentAuthVerifyMiddleWare,TasksController.taskStatusCount);


module.exports = router;