const express = require("express");
const router = express.Router();
const TeachersAuthController = require('../controllers/TeachersAuthController')
const TeacherAuthVerifyMiddleware=require("../middleWare/TeacherAuthVerifyMiddleWare");
const TeacherTasksController = require('../controllers/TeacherTaskController')

router.post('/Registration', TeachersAuthController.Registration)
router.get('/Login/:email/:password', TeachersAuthController.Login)
router.get('/AvailableTeachers', TeachersAuthController.AvailableTeachers)
router.get('/AvailityCheckTeachers/:email', TeachersAuthController.AvailityCheckTeachers)
router.get('/ProfileDetails', TeacherAuthVerifyMiddleware, TeachersAuthController.ProfileDetails)
router.post('/ProfileUpdate', TeacherAuthVerifyMiddleware, TeachersAuthController.ProfileUpdate)
router.get("/RecoverVerifyEmail/:email",TeachersAuthController.RecoverVerifyEmail);
router.get("/RecoverVerifyOTP/:email/:otp",TeachersAuthController.RecoverVerifyOtp);
router.post("/RecoverResetPassword",TeachersAuthController.RecoverResetPassword);


//router.post("/createTask",TeacherAuthVerifyMiddleware,TeacherTasksController.createTask);
router.post("/createSubjectGroupBatchSections",TeacherAuthVerifyMiddleware,TeacherTasksController.createSubjectGroupBatchSections);
router.post("/joinSubjectGroupBatchSections/:id",TeacherTasksController.joinSubjectGroupBatchSections);
router.post("/joinSubjectGroupBatchSections/:courseGroupId/:memberId",TeacherTasksController.chatSubjectGroupBatchSections);
router.get("/deleteGroupsByTeachers/:id",TeacherAuthVerifyMiddleware, TeacherTasksController.deleteGroupsByTeachers);
router.get('/delete-chat/:groupId/:memberId/:messageId', TeacherTasksController.deleteChatMessage);
router.get("/teacherAddTask/:batch/:section/:title/:taskType",TeacherAuthVerifyMiddleware,TeacherTasksController.teacherAddTask);
router.post("/facultyMeeting",TeacherAuthVerifyMiddleware, TeacherTasksController.facultyMeeting);
router.get("/showFacultyMeeting",TeacherAuthVerifyMiddleware, TeacherTasksController.showFacultyMeeting);
router.post("/announcement",TeacherAuthVerifyMiddleware, TeacherTasksController.announcement);
router.get("/showAnnouncement",TeacherAuthVerifyMiddleware, TeacherTasksController.showAnnouncement);
router.post("/resource",TeacherAuthVerifyMiddleware, TeacherTasksController.resource);
router.get("/showResources",TeacherAuthVerifyMiddleware, TeacherTasksController.showResources);
router.get("/deleteTeacherResources/:id",TeacherAuthVerifyMiddleware,TeacherTasksController.deleteTeacherResources);
router.post("/facAddMyTodo",TeacherAuthVerifyMiddleware, TeacherTasksController.facAddMyTodo);
router.get("/showFacMyTodo",TeacherAuthVerifyMiddleware,TeacherTasksController.showFacMyTodo);
//router.post("/joinGroupBySubjId/:id",TeacherAuthVerifyMiddleware,TeacherTasksController.createGroup2);
//router.post("/chatGroup/:id",TeacherAuthVerifyMiddleware,TeacherTasksController.chatGroup);
router.get("/deleteTeacherTask/:id",TeacherAuthVerifyMiddleware,TeacherTasksController.deleteTeacherTask);
router.get("/deleteFacultyMeeting/:id",TeacherAuthVerifyMiddleware,TeacherTasksController.deleteFacultyMeeting);
router.get("/deleteTeacherAnnouncement/:id",TeacherAuthVerifyMiddleware,TeacherTasksController.deleteTeacherAnnouncement);
router.get("/deleteTeacherTodo/:id",TeacherAuthVerifyMiddleware,TeacherTasksController.deleteTeacherTodo);
router.post("/updateSubjectGroupDetails/:id",TeacherAuthVerifyMiddleware,TeacherTasksController.updateSubjectGroupDetails);

router.get("/listTaskByStatus/:batch",TeacherAuthVerifyMiddleware,TeacherTasksController.listTaskByStatus);
router.get("/taskStatusCount",TeacherAuthVerifyMiddleware,TeacherTasksController.taskStatusCount);

// available
router.get("/showFacultySubGrpBatchSec", TeacherAuthVerifyMiddleware, TeacherTasksController.showFacultySubGrpBatchSec);
router.get("/showChats/:groupId", TeacherTasksController.showChats);


module.exports = router;