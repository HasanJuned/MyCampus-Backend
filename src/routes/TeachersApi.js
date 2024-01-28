const express = require("express");
const router = express.Router();
const TeachersAuthController = require('../controllers/TeachersAuthController')
const TeacherAuthVerifyMiddleware=require("../middleWare/TeacherAuthVerifyMiddleWare");
//const TasksController = require('../controllers/TaskController')

router.post('/Registration', TeachersAuthController.Registration)
router.post('/Login', TeachersAuthController.Login)
router.get('/ProfileDetails', TeacherAuthVerifyMiddleware, TeachersAuthController.ProfileDetails)
router.post('/ProfileUpdate', TeacherAuthVerifyMiddleware, TeachersAuthController.ProfileUpdate)
router.get("/RecoverVerifyEmail/:email",TeachersAuthController.RecoverVerifyEmail);
router.get("/RecoverVerifyOTP/:email/:otp",TeachersAuthController.RecoverVerifyOtp);
router.post("/RecoverResetPassword",TeachersAuthController.RecoverResetPassword);


// router.post("/createTask",AuthVerifyMiddleware,TasksController.createTask);
// router.get("/deleteTask/:id",AuthVerifyMiddleware,TasksController.deleteTask);
// router.get("/updateTaskStatus/:id/:status",AuthVerifyMiddleware,TasksController.updateTaskStatus);
// router.get("/listTaskByStatus/:status",AuthVerifyMiddleware,TasksController.listTaskByStatus);
// router.get("/taskStatusCount",AuthVerifyMiddleware,TasksController.taskStatusCount);


module.exports = router;