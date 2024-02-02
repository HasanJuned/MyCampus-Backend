const TeacherTaskModel = require("../models/TeacherTaskModel")
const CourseTeacherGroupModel = require("../models/CourseTeacherGroupModel")
const ChatGroupModel = require("../models/ChatGroupModel")


/// createBatchSectionCourse
exports.createTask = async (req, res) => {

    try {
        let reqBody = req.body;
        reqBody.email = req.headers['email'];
        let result1 = await TeacherTaskModel.create(reqBody)
        res.status(200).json({status: 'success', data: result1});


    } catch (e) {
        res.status(200).json({status: 'fail', data: 'Internal Server Error'});
    }


}

exports.createGroup = async (req, res) => {
    try {

        let id = req.params.id;
        let findId = {_id: id} // id found
        const reqBody = req.body;
        const members = Array.isArray(reqBody.member) ? reqBody.member : [reqBody.member]; // Assuming this is an array of member objects to add

        const mainDocument = await CourseTeacherGroupModel.findById(findId);

        if (!mainDocument) {
            console.log("Main document not found");
            return res.status(200).json({ status: 'fail', data: 'Main document not found' });
        }

        const existingMembers = mainDocument.member.filter(existingMember =>
            members.some(newMember => existingMember.name === newMember.name)
        );

        if (existingMembers.length === 0) {
            // Add new members to the array using $push
            mainDocument.member.push(...members);

            // Save the updated document
            const updatedDocument = await mainDocument.save();
            return res.status(200).json({ status: 'success', data: updatedDocument });
        } else {
            console.log("One or more members already added");
            return res.status(200).json({ status: 'fail', data: 'One or more members already added' });
        }
    } catch (e) {
        console.error(e.toString());
        return res.status(200).json({ status: 'fail', data: e.toString() });
    }
};


exports.createGroup2 = async (req, res) => {

    try {

        let reqBody = req.body;
        let id = req.params.id
        let email = req.headers['email']

        // let courseTitle = reqBody.courseTitle
        // let name = reqBody.member.name
        // let bool = false;
        // console.log(name)
        let result2 = await CourseTeacherGroupModel.find({"_id": id});
        if(result2 === 0){
             console.log('found', result2)
            // reqBody.email = req.headers['email'];
            //let result = await CourseTeacherGroupModel.create(reqBody)
            res.status(200).json({status: 'success', data: result2});
        } else {
            console.log("Already added")
            res.status(200).json({status: 'fail', data: 'Already added'});

        }


    } catch (e) {
        res.status(200).json({status: 'fail', data: e.toString()});
    }


}

exports.chatGroup = async (req, res) => {

    try {

        let reqBody = req.body;
        reqBody.email = req.headers['email'];
        let result = await ChatGroupModel.create(reqBody)
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

        let result = await CourseTeacherGroupModel.find({email: email, batch: batch})
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
                    batch: "$batch", section: "$section", courseCode: "$courseCode", courseTitle: "$courseTitle"
                }, sum: {$count: {}}
            }
        }]);
        res.status(200).json({status: 'success', data: result});

    } catch (e) {
        res.status(200).json({status: 'fail', data: 'Internal Server Error'});
    }


}


exports.AvailableCourseAndTeacher = async (req, res) => {

    try {

        let result = await TeacherTaskModel.find()
        res.status(200).json({status: 'success', data: result});


    } catch (e) {
        res.status(200).json({status: 'fail', data: 'Internal Server Error'});
    }


}