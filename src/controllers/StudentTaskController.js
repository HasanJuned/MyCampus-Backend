const TasksModel = require("../models/StudentTaskModel")
const CourseTeacherGroupModel = require("../models/CourseTeacherGroupModel");
const TeacherAnnouncement = require("../models/TeacherAnnouncementModel");

exports.availableCourseBatch = async (req, res) => {

    try {
        let result = await CourseTeacherGroupModel.aggregate([
            {
                $project: {
                    _id: 1,
                    batch: 1,
                    courseCode: 1,
                    courseTitle: 1,
                    email: 1,
                    member: {
                        name: 1,
                        designation: 1,
                        department: 1
                    }
                }
            }
        ]);
        res.status(200).json({status: 'success', data: result});

    } catch (e) {
        res.status(400).json({status: 'fail', data: 'Try again'});
    }

}

exports.allAnnouncement = async (req, res) => {

    try {

        let batch = req.params.batch
        let type = req.params.type
        let result = await TeacherAnnouncement.find({batch: batch, type: type});
        let count = result.length;
        return res.status(200).json({status: 'success', total: count, data: result});

    } catch (e) {
        res.status(400).json({status: 'fail', data: 'Try again'});
    }

}

exports.enrolledCourse = async (req, res) => {
    try {
        const memberName = req.params.memberName;
        if (!memberName) {
            return res.status(400).json({ status: 'fail', data: 'Member name is required' });
        }

        console.log('Received member name:', memberName);  // Log the received member name

        let result = await CourseTeacherGroupModel.find({
            member: { $elemMatch: { name: memberName } }
        });

        if (result.length === 0) {
            return res.status(404).json({ status: 'fail', data: 'Not Found' });
        }

        res.status(200).json({ status: 'success', data: result });
    } catch (e) {
        console.error('Error occurred:', e);  // Log the error for debugging
        res.status(500).json({ status: 'fail', data: 'An error occurred' });
    }
}



exports.createTask=async(req,res)=>{

    try{
        let reqBody = req.body;
        reqBody.email = req.headers['email'];

        let result = await TasksModel.create(reqBody)
        res.status(200).json({ status: 'success', data: result });

    }catch(e){
        res.status(200).json({ status: 'fail', data: 'Internal Server Error' });
    }



}

exports.deleteTask=async(req,res)=>{
    try{
        let id = req.params.id;
        let deleteTask = {_id:id}

        let result = await TasksModel.deleteOne(deleteTask)
        res.status(200).json({ status: 'success', data: result });

    }catch(e){
        res.status(200).json({ status: 'fail', data: 'Internal Server Error' });

    }
}

exports.updateTaskStatus=async(req,res)=>{

    try{

        let id = req.params.id;
        let status = req.params.status;
        let updateTask = {_id:id};
        let reqBody = {status:status};

        let result = await TasksModel.updateOne(updateTask,reqBody)
        res.status(200).json({ status: 'success', data: result });


    }catch(e){
        res.status(200).json({ status: 'fail', data: 'Internal Server Error' });

    }

}

exports.listTaskByStatus=async(req,res)=>{

    try{

        let status = req.params.status;
        let email = req.headers['email']

        let result = await TasksModel.find({email:email, status:status})
        res.status(200).json({ status: 'success', data: result });



    }catch(e){
        res.status(200).json({ status: 'fail', data: 'Internal Server Error' });
    }

}

exports.taskStatusCount=async(req,res)=>{

    try{

        let email = req.headers['email'];
        let result = await TasksModel.aggregate([
            {$match:{email:email}},
            {$group: {_id:"$status", sum:{$count:{}}}}
        ]);

        res.status(200).json({ status: 'success', data: result });

    }catch(e){
        res.status(200).json({ status: 'fail', data: 'Internal Server Error' });
    }



}