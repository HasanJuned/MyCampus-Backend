const TeacherTaskModel = require("../models/TeacherTaskModel")
const AvailableCourseTeacherGroupModel = require("../models/AvailableCourseTeacherGroupModel")

/// createBatchSectionCourse
exports.createTask = async (req, res) => {

    try {
        let reqBody = req.body;
        reqBody.email = req.headers['email'];
        let result = await TeacherTaskModel.create(reqBody)
        res.status(200).json({status: 'success', data: result});

    } catch (e) {
        res.status(200).json({status: 'fail', data: 'Internal Server Error'});
    }


}

exports.deleteTask = async (req, res) => {
    try {
        let id = req.params.id;
        let deleteTask = {_id: id}

        let result = await TeacherTaskModel.deleteOne(deleteTask)
        res.status(200).json({status: 'success', data: result});

    } catch (e) {
        res.status(200).json({status: 'fail', data: 'Internal Server Error'});

    }
}

exports.updateTaskStatus = async (req, res) => {

    try {

        let id = req.params.id;
        let courseCode = req.params.courseCode;
        let updateTask = {_id: id};
        let reqBody = {courseCode: courseCode};

        let result = await TeacherTaskModel.updateOne(updateTask, reqBody)
        res.status(200).json({status: 'success', data: result});


    } catch (e) {
        res.status(200).json({status: 'fail', data: 'Internal Server Error'});

    }

}

exports.listTaskByStatus = async (req, res) => {

    try {

        let batch = req.params.batch;
        let email = req.headers['email']

        let result = await TeacherTaskModel.find({email: email, batch: batch})
        res.status(200).json({status: 'success', data: result});


    } catch (e) {
        res.status(200).json({status: 'fail', data: 'Internal Server Error'});
    }

}

/// showTeacherBatchList
exports.taskStatusCount = async (req, res) => {

    try {

        let email = req.headers['email'];
        let result = await TeacherTaskModel.aggregate([{$match: {email: email}}, {
            $group: {
                _id: {
                    batch: "$batch",
                    section: "$section",
                    courseCode: "$courseCode",
                    courseTitle: "$courseTitle"
                }, sum: {$count: {}}
            }
        }]);
        res.status(200).json({status: 'success', data: result});

    } catch (e) {
        res.status(200).json({status: 'fail', data: 'Internal Server Error'});
    }


}


exports.available = async (req, res) => {

    try {

        let result = await TeacherTaskModel.find()
        res.status(200).json({ status: 'success', data: result });


    } catch (e) {
        res.status(200).json({status: 'fail', data: 'Internal Server Error'});
    }


}