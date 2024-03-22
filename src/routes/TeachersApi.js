const express = require("express");
const router = express.Router();
const TeachersAuthController = require('../controllers/TeachersAuthController')
const TeacherAuthVerifyMiddleware=require("../middleWare/TeacherAuthVerifyMiddleWare");
const TeacherTasksController = require('../controllers/TeacherTaskController')

router.post('/Registration', TeachersAuthController.Registration)
router.post('/Login', TeachersAuthController.Login)
router.get('/AvailableTeachers', TeachersAuthController.AvailableTeachers)
router.get('/ProfileDetails', TeacherAuthVerifyMiddleware, TeachersAuthController.ProfileDetails)
router.post('/ProfileUpdate', TeacherAuthVerifyMiddleware, TeachersAuthController.ProfileUpdate)
router.get("/RecoverVerifyEmail/:email",TeachersAuthController.RecoverVerifyEmail);
router.get("/RecoverVerifyOTP/:email/:otp",TeachersAuthController.RecoverVerifyOtp);
router.post("/RecoverResetPassword",TeachersAuthController.RecoverResetPassword);


//router.post("/createTask",TeacherAuthVerifyMiddleware,TeacherTasksController.createTask);
router.post("/createSubjectGroupBatchSections/:id",TeacherAuthVerifyMiddleware,TeacherTasksController.createSubjectGroupBatchSections);
router.post("/joinSubjectGroupBatchSections/:id",TeacherAuthVerifyMiddleware,TeacherTasksController.joinSubjectGroupBatchSections);
router.post("/joinSubjectGroupBatchSections/:courseGroupId/:memberId",TeacherAuthVerifyMiddleware,TeacherTasksController.chatSubjectGroupBatchSections);
//router.post("/joinGroupBySubjId/:id",TeacherAuthVerifyMiddleware,TeacherTasksController.createGroup2);
router.post("/chatGroup/:id",TeacherAuthVerifyMiddleware,TeacherTasksController.chatGroup);
router.get("/deleteTask/:id",TeacherAuthVerifyMiddleware,TeacherTasksController.deleteTask);
router.get("/updateTaskStatus/:id/:courseCode",TeacherAuthVerifyMiddleware,TeacherTasksController.updateTaskStatus);
router.get("/listTaskByStatus/:batch",TeacherAuthVerifyMiddleware,TeacherTasksController.listTaskByStatus);
router.get("/taskStatusCount",TeacherAuthVerifyMiddleware,TeacherTasksController.taskStatusCount);


// available
router.get("/availableCourseAndTeacher",TeacherTasksController.AvailableCourseAndTeacher);


module.exports = router;