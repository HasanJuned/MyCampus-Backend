const express = require("express");
const router = express.Router();
const TeachersAuthController = require('../controllers/TeachersAuthController')
const TeacherAuthVerifyMiddleware=require("../middleWare/TeacherAuthVerifyMiddleWare");
const TeacherTasksController = require('../controllers/TeacherTaskController')

router.post('/Registration', TeachersAuthController.Registration)
router.post('/Login', TeachersAuthController.Login)
router.get('/ProfileDetails', TeacherAuthVerifyMiddleware, TeachersAuthController.ProfileDetails)
router.post('/ProfileUpdate', TeacherAuthVerifyMiddleware, TeachersAuthController.ProfileUpdate)
router.get("/RecoverVerifyEmail/:email",TeachersAuthController.RecoverVerifyEmail);
router.get("/RecoverVerifyOTP/:email/:otp",TeachersAuthController.RecoverVerifyOtp);
router.post("/RecoverResetPassword",TeachersAuthController.RecoverResetPassword);


router.post("/createTask",TeacherAuthVerifyMiddleware,TeacherTasksController.createTask);
router.post("/createGroup",TeacherAuthVerifyMiddleware,TeacherTasksController.createGroup);
router.post("/chatGroup",TeacherAuthVerifyMiddleware,TeacherTasksController.chatGroup);
router.get("/deleteTask/:id",TeacherAuthVerifyMiddleware,TeacherTasksController.deleteTask);
router.get("/updateTaskStatus/:id/:courseCode",TeacherAuthVerifyMiddleware,TeacherTasksController.updateTaskStatus);
router.get("/listTaskByStatus/:batch",TeacherAuthVerifyMiddleware,TeacherTasksController.listTaskByStatus);
router.get("/taskStatusCount",TeacherAuthVerifyMiddleware,TeacherTasksController.taskStatusCount);


// available
router.get("/availableCourseAndTeacher",TeacherTasksController.AvailableCourseAndTeacher);


module.exports = router;