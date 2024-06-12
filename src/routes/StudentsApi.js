const express = require("express");
const router = express.Router();
const StudentsAuthController = require('../controllers/StudentsAuthController')
const StudentAuthVerifyMiddleWare=require("../middleWare/StudentAuthVerifyMiddleWare");
const StudentTasksController = require('../controllers/StudentTaskController')
const TeachersAuthController = require("../controllers/TeachersAuthController");

router.post('/Registration', StudentsAuthController.Registration)
router.get('/Login/:studentId/:password', StudentsAuthController.Login)
router.get('/ProfileDetails', StudentAuthVerifyMiddleWare, StudentsAuthController.ProfileDetails)
router.post('/ProfileUpdate', StudentAuthVerifyMiddleWare, StudentsAuthController.ProfileUpdate)
router.get("/RecoverVerifyEmail/:email",StudentsAuthController.RecoverVerifyEmail);
router.get("/RecoverVerifyOTP/:email/:otp",StudentsAuthController.RecoverVerifyOtp);
router.post("/RecoverResetPassword",StudentsAuthController.RecoverResetPassword);


router.post("/createTask",StudentAuthVerifyMiddleWare,StudentTasksController.createTask);
router.get("/deleteTask/:id",StudentAuthVerifyMiddleWare,StudentTasksController.deleteTask);
router.get("/updateTaskStatus/:id/:status",StudentAuthVerifyMiddleWare,StudentTasksController.updateTaskStatus);
router.get("/listTaskByStatus/:status",StudentAuthVerifyMiddleWare,StudentTasksController.listTaskByStatus);
router.get("/taskStatusCount",StudentAuthVerifyMiddleWare,StudentTasksController.taskStatusCount);


module.exports = router;